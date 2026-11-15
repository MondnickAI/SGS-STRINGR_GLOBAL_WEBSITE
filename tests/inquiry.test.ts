import { describe, expect, it } from "vitest";
import { INQUIRY_LIMITS, validateInquiry } from "@/lib/inquiry";

const SERVICES = ["it-technical-services", "not-sure"];

const valid = {
  name: "Jane Smith",
  email: "Jane.Smith@Example.co.uk",
  company: "Example Ltd",
  phone: "+44 20 7946 0000",
  service: "it-technical-services",
  message: "We need managed IT support for 40 users.",
  consent: true,
};

describe("validateInquiry", () => {
  it("accepts a complete inquiry and normalises the email", () => {
    const result = validateInquiry(valid, SERVICES);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.email).toBe("jane.smith@example.co.uk");
  });

  it("allows the phone number to be omitted", () => {
    expect(validateInquiry({ ...valid, phone: "" }, SERVICES).ok).toBe(true);
  });

  it("reports every missing required field", () => {
    const result = validateInquiry({}, SERVICES);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual(["company", "consent", "email", "message", "name", "service"]);
    }
  });

  it.each(["plainaddress", "a@b", "two@@example.com", "name@example", "a b@example.com"])(
    "rejects the invalid email %s",
    (email) => {
      const result = validateInquiry({ ...valid, email }, SERVICES);
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.errors.email).toBeDefined();
    },
  );

  it("rejects a service that is not in the allowed list", () => {
    const result = validateInquiry({ ...valid, service: "something-else" }, SERVICES);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.service).toBeDefined();
  });

  it("requires consent to be exactly true", () => {
    expect(validateInquiry({ ...valid, consent: "true" }, SERVICES).ok).toBe(false);
  });

  it("enforces the message length limits", () => {
    expect(validateInquiry({ ...valid, message: "short" }, SERVICES).ok).toBe(false);
    expect(validateInquiry({ ...valid, message: "x".repeat(INQUIRY_LIMITS.message + 1) }, SERVICES).ok).toBe(false);
  });

  it("strips line breaks from single-line fields to prevent email header injection", () => {
    const result = validateInquiry({ ...valid, name: "Jane\r\nBcc: attacker@example.com" }, SERVICES);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.name).not.toMatch(/[\r\n]/);
  });

  it("handles non-object input without throwing", () => {
    expect(validateInquiry(null, SERVICES).ok).toBe(false);
    expect(validateInquiry("text", SERVICES).ok).toBe(false);
  });
});
