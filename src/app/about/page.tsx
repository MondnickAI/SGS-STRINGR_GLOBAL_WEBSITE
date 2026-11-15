import { Eye, Target } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, CtaBand, FeatureCard, PageHero, SectionHeading, container } from "@/components/ui";
import { getCompany, getSite } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "STRINGR GLOBAL SERVICES is a solutions-driven outsourcing and technology company. Learn about our mission, vision, strategic pillars, core values and approach.",
  path: "/about",
});

export default function AboutPage() {
  const site = getSite();
  const company = getCompany();

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A solutions-driven partner for a fast-changing global environment"
        intro={`${site.name} delivers smart, reliable and seamless services that help organisations improve operations, strengthen efficiency and grow sustainably.`}
        crumbs={[{ label: "About Us" }]}
      />

      {/* introduction */}
      <section className="py-20 sm:py-24">
        <div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <SectionHeading eyebrow="Who we are" title="Practical expertise, responsive service and modern solutions" />
          <div className="space-y-5 text-lg text-ink-700">
            {company.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className={`${container} mt-16 grid gap-5 md:grid-cols-3`}>
          {company.commitment.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* mission and vision */}
      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
        <div className="bg-dots absolute inset-0" aria-hidden="true" />
        <div className={`${container} relative grid gap-6 lg:grid-cols-2`}>
          {[
            { label: "Our mission", text: company.mission, Mark: Target },
            { label: "Our vision", text: company.vision, Mark: Eye },
          ].map(({ label, text, Mark }) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500 text-ink-950">
                  <Mark className="h-6 w-6" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h2 className="text-2xl font-bold text-white">{label}</h2>
              </div>
              <p className="mt-6 text-xl leading-relaxed text-ink-200">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* pillars */}
      <section className="py-20 sm:py-24">
        <div className={container}>
          <SectionHeading
            eyebrow="Strategic pillars"
            title="What our service is built on"
            intro="Three commitments shape how we design and deliver every engagement."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {company.pillars.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="bg-ink-50 py-20 sm:py-24">
        <div className={container}>
          <SectionHeading
            eyebrow="Core values"
            title="Our values drive our actions, guide our decisions and define our culture"
          />
          <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {company.values.map((value, index) => (
              <div key={value.title} className="border-t-2 border-ink-950 pt-5">
                <dt>
                  <span className="font-display text-sm font-bold text-brand-700" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="mt-2 block font-display text-xl font-bold text-ink-950">{value.title}</span>
                </dt>
                <dd className="mt-3 text-ink-600">{value.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* aims */}
      <section className="py-20 sm:py-24">
        <div className={container}>
          <SectionHeading eyebrow="Core aims" title="Where we are heading" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {company.aims.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* approach */}
      <section className="border-t border-ink-200 py-20 sm:py-24">
        <div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div>
            <SectionHeading
              eyebrow="Our approach"
              title="Built around understanding each client"
              intro="We provide dependable solutions that are efficient, flexible and results-oriented, and we work as a natural extension of your internal team."
            />
            <div className="mt-8">
              <ButtonLink href="/why-choose-us" variant="outline" arrow>
                Why partner with us
              </ButtonLink>
            </div>
          </div>
          <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {company.engagement.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink-950 font-display text-sm font-bold text-brand-400"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-ink-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
    </>
  );
}
