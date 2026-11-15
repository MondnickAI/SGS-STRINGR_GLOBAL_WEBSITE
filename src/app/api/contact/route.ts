import { NextResponse } from "next/server";
import { getServiceInterestOptions, getSite } from "@/lib/content";
import { validateInquiry } from "@/lib/inquiry";
import { deliverInquiry } from "@/lib/mailer";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_CHARS = 20_000;
/** A real visitor cannot read and complete the form faster than this. */
const MIN_FILL_MS = 3_000;

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function isCrossSite(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

export async function POST(request: Request) {
  const site = getSite();
  const emailUs = `email us directly at ${site.contact.email}`;

  // Browsers send Origin on cross-site POSTs; reject anything that is not this site.
  if (isCrossSite(request)) {
    return json({ ok: false, message: "This request is not allowed." }, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, message: "Unsupported request format." }, 415);
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_CHARS) {
    return json({ ok: false, message: "Your message is too long." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(rawBody);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, message: "We could not read your submission. Please try again." }, 400);
  }

  // Spam traps: a hidden field real visitors never fill, and an implausibly fast submission.
  // Respond as if successful so automated senders learn nothing.
  const elapsed = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if ((typeof body.website === "string" && body.website.length > 0) || elapsed < MIN_FILL_MS) {
    return json({ ok: true }, 200);
  }

  if (isRateLimited(clientKey(request))) {
    return json({ ok: false, message: `Too many submissions. Please wait a few minutes, or ${emailUs}.` }, 429);
  }

  const options = getServiceInterestOptions();
  const result = validateInquiry(
    body,
    options.map((option) => option.value),
  );
  if (!result.ok) {
    return json({ ok: false, message: "Please check the highlighted fields.", errors: result.errors }, 422);
  }

  try {
    const outcome = await deliverInquiry(result.data, {
      to: process.env.CONTACT_TO?.trim() || site.contact.email,
      siteName: site.name,
      serviceLabel: options.find((option) => option.value === result.data.service)?.label ?? result.data.service,
    });
    if (outcome === "not-configured") {
      return json({ ok: false, message: `Our online form is temporarily unavailable. Please ${emailUs}.` }, 503);
    }
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[inquiry] Delivery failed:", error instanceof Error ? error.message : error);
    return json({ ok: false, message: `We could not send your message just now. Please ${emailUs}.` }, 502);
  }
}
