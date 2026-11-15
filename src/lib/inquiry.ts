/**
 * Inquiry form rules shared by the browser form and the server endpoint.
 * The server always re-validates; client validation is only for fast feedback.
 */

export const INQUIRY_LIMITS = {
  name: 100,
  email: 254,
  company: 150,
  phone: 40,
  message: 4000,
  messageMin: 10,
} as const;

export interface InquiryInput {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
}

export type InquiryField = keyof InquiryInput;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export type InquiryResult = { ok: true; data: InquiryInput } | { ok: false; errors: InquiryErrors };

const EMAIL_PATTERN = /^[^\s@<>(),;:"]+@[^\s@<>(),;:"]+\.[^\s@<>(),;:".]{2,}$/;
const PHONE_PATTERN = /^[0-9+()\-.\s]{6,}$/;

/** Collapse to a single line and remove control characters (prevents header injection). */
function singleLine(value: unknown): string {
  return typeof value === "string"
    ? value
        .replace(/[\u0000-\u001f\u007f]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";
}

function multiLine(value: unknown): string {
  return typeof value === "string"
    ? value
        .replace(/\r\n?/g, "\n")
        .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "")
        .trim()
    : "";
}

export function validateInquiry(raw: unknown, allowedServices: readonly string[]): InquiryResult {
  const source = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;

  const data: InquiryInput = {
    name: singleLine(source.name),
    email: singleLine(source.email).toLowerCase(),
    company: singleLine(source.company),
    phone: singleLine(source.phone),
    service: singleLine(source.service),
    message: multiLine(source.message),
    consent: source.consent === true,
  };

  const errors: InquiryErrors = {};

  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length > INQUIRY_LIMITS.name) errors.name = "Name is too long.";

  if (!data.email) errors.email = "Please enter your email address.";
  else if (data.email.length > INQUIRY_LIMITS.email || !EMAIL_PATTERN.test(data.email))
    errors.email = "Please enter a valid email address.";

  if (!data.company) errors.company = "Please enter your company name.";
  else if (data.company.length > INQUIRY_LIMITS.company) errors.company = "Company name is too long.";

  if (data.phone && (data.phone.length > INQUIRY_LIMITS.phone || !PHONE_PATTERN.test(data.phone)))
    errors.phone = "Please enter a valid phone number, or leave this blank.";

  if (!data.service) errors.service = "Please select the service you are interested in.";
  else if (!allowedServices.includes(data.service)) errors.service = "Please select an option from the list.";

  if (!data.message) errors.message = "Please tell us a little about your requirements.";
  else if (data.message.length < INQUIRY_LIMITS.messageMin) errors.message = "Please add a little more detail.";
  else if (data.message.length > INQUIRY_LIMITS.message)
    errors.message = `Please keep your message under ${INQUIRY_LIMITS.message} characters.`;

  if (!data.consent) errors.consent = "Please confirm that we may use your details to respond.";

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data };
}
