import "server-only";
import nodemailer from "nodemailer";
import type { InquiryInput } from "./inquiry";

export type DeliveryOutcome = "sent" | "logged" | "not-configured";

interface DeliveryOptions {
  to: string;
  siteName: string;
  serviceLabel: string;
}

function smtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  if (!host) return null;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: user && pass ? { user, pass } : undefined,
    from: process.env.CONTACT_FROM?.trim() || user,
  };
}

/**
 * Delivers an inquiry to the company mailbox.
 * - SMTP configured: sends the email ("sent"); throws if the mail server rejects it.
 * - Not configured, development: prints the inquiry to the server console ("logged").
 * - Not configured, production: returns "not-configured" so the caller can tell the visitor.
 */
export async function deliverInquiry(inquiry: InquiryInput, options: DeliveryOptions): Promise<DeliveryOutcome> {
  const text = [
    `New website inquiry for ${options.siteName}`,
    "",
    `Name:     ${inquiry.name}`,
    `Email:    ${inquiry.email}`,
    `Company:  ${inquiry.company}`,
    `Phone:    ${inquiry.phone || "Not provided"}`,
    `Interest: ${options.serviceLabel}`,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");

  const config = smtpConfig();

  if (!config || !config.from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[inquiry] SMTP is not configured; inquiry printed instead of emailed:\n${text}`);
      return "logged";
    }
    console.error("[inquiry] SMTP is not configured (set SMTP_HOST and CONTACT_FROM). Inquiry was not delivered.");
    return "not-configured";
  }

  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });

  await transport.sendMail({
    from: { name: `${options.siteName} Website`, address: config.from },
    to: options.to,
    replyTo: { name: inquiry.name, address: inquiry.email },
    subject: `Website inquiry: ${inquiry.company} (${options.serviceLabel})`,
    text,
  });
  return "sent";
}
