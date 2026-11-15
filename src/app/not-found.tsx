import type { Metadata } from "next";
import { ButtonLink, Eyebrow, container } from "@/components/ui";

export const metadata: Metadata = { title: "Page Not Found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className={`${container} py-28 sm:py-36`}>
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">We could not find that page</h1>
      <p className="mt-5 max-w-xl text-lg text-ink-600">
        The page may have moved or the address may be incorrect. You can return to the homepage or browse our services.
      </p>
      <div className="mt-9 flex flex-wrap gap-4">
        <ButtonLink href="/" arrow>
          Back to Home
        </ButtonLink>
        <ButtonLink href="/services" variant="outline">
          Explore Our Services
        </ButtonLink>
      </div>
    </section>
  );
}
