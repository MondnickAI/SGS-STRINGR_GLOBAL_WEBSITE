"use client";

import Link from "next/link";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { INQUIRY_LIMITS, validateInquiry, type InquiryErrors, type InquiryField } from "@/lib/inquiry";
import { buttonClass } from "./ui";

interface Option {
  value: string;
  label: string;
}

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: InquiryField[] = ["name", "email", "company", "phone", "service", "message", "consent"];

const inputClass = (invalid: boolean) =>
  `mt-2 block w-full rounded-md border bg-white px-4 py-3 text-base text-ink-950 placeholder:text-ink-400 transition-colors focus:border-ink-950 focus:outline-none focus:ring-2 focus:ring-brand-500/60 ${
    invalid ? "border-red-600" : "border-ink-300"
  }`;

function Field({
  id,
  label,
  optional = false,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-display text-sm font-semibold text-ink-950">
        {label} {optional && <span className="font-sans font-normal text-ink-500">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-700">
          <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ services, email }: { services: Option[]; email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [formError, setFormError] = useState("");
  const [service, setService] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);

  // Preselect the service when arriving from a service page (?service=slug).
  useEffect(() => {
    startedAt.current = Date.now();
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && services.some((option) => option.value === requested)) setService(requested);
  }, [services]);

  useEffect(() => {
    if (status === "success") confirmationRef.current?.focus();
  }, [status]);

  function focusFirstError(found: InquiryErrors) {
    const first = FIELD_ORDER.find((field) => found[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      phone: form.get("phone"),
      service: form.get("service"),
      message: form.get("message"),
      consent: form.get("consent") === "on",
    };

    const check = validateInquiry(
      payload,
      services.map((option) => option.value),
    );
    if (!check.ok) {
      setErrors(check.errors);
      setFormError("");
      focusFirstError(check.errors);
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...check.data,
          website: form.get("website"),
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        errors?: InquiryErrors;
      } | null;

      if (response.ok && result?.ok) {
        setStatus("success");
        return;
      }
      if (result?.errors) {
        setErrors(result.errors);
        focusFirstError(result.errors);
      }
      setFormError(result?.message || `Something went wrong. Please try again or email us at ${email}.`);
      setStatus("error");
    } catch {
      setFormError(`We could not reach the server. Please check your connection, or email us at ${email}.`);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={confirmationRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-ink-200 bg-ink-50 p-8 focus:outline-none sm:p-10"
      >
        <CircleCheck className="h-12 w-12 text-green-700" aria-hidden="true" strokeWidth={1.5} />
        <h2 className="mt-5 text-2xl font-bold">Thank you. Your inquiry has been sent.</h2>
        <p className="mt-3 text-lg text-ink-600">
          Our team will review your message and reply to the email address you provided. If your request is urgent,
          you can also reach us at{" "}
          <a href={`mailto:${email}`} className="font-semibold text-brand-700 underline underline-offset-2">
            {email}
          </a>
          .
        </p>
        <button
          type="button"
          className={buttonClass("outline", "mt-7")}
          onClick={() => {
            setStatus("idle");
            startedAt.current = Date.now();
          }}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const describedBy = (field: InquiryField) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby="form-note">
      <p id="form-note" className="text-sm text-ink-500">
        All fields are required unless marked optional.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={INQUIRY_LIMITS.name}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={INQUIRY_LIMITS.email}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>
        <Field id="company" label="Company name" error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={INQUIRY_LIMITS.company}
            aria-required="true"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={describedBy("company")}
            className={inputClass(Boolean(errors.company))}
          />
        </Field>
        <Field id="phone" label="Phone" optional error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={INQUIRY_LIMITS.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            className={inputClass(Boolean(errors.phone))}
          />
        </Field>
      </div>

      <Field id="service" label="Service of interest" error={errors.service}>
        <select
          id="service"
          name="service"
          value={service}
          onChange={(event) => setService(event.target.value)}
          aria-required="true"
          aria-invalid={Boolean(errors.service)}
          aria-describedby={describedBy("service")}
          className={inputClass(Boolean(errors.service))}
        >
          <option value="">Select a service</option>
          {services.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="How can we help?" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={INQUIRY_LIMITS.message}
          placeholder="Tell us about your business, what you need support with and any timelines."
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={inputClass(Boolean(errors.message))}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive technology; automated senders tend to fill it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            aria-required="true"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            className="mt-1 h-5 w-5 shrink-0 rounded border-ink-400 accent-ink-950"
          />
          <label htmlFor="consent" className="text-[0.95rem] text-ink-700">
            I agree that STRINGR GLOBAL SERVICES may use these details to respond to my inquiry, as described in the{" "}
            <Link href="/privacy-policy" className="font-semibold text-brand-700 underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-700">
            <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
            {errors.consent}
          </p>
        )}
      </div>

      <div aria-live="polite">
        {formError && (
          <p className="flex gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[0.95rem] font-medium text-red-800">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            {formError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClass("primary", "w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto")}
      >
        {status === "submitting" && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
