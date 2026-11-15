import { JsonLd } from "@/components/JsonLd";
import { IconBadge, CtaBand, FeatureCard, PageHero, SectionHeading, container } from "@/components/ui";
import { getCompany } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Why Choose Us",
  description:
    "Why clients choose STRINGR GLOBAL SERVICES: hybrid human and AI operations, intelligent managed IT, and enterprise capability delivered with agile execution.",
  path: "/why-choose-us",
});

export default function WhyChooseUsPage() {
  const company = getCompany();

  return (
    <>
      <PageHero
        eyebrow="Why choose us"
        title="Why clients choose us over legacy players"
        intro="We combine the capability you expect from an established provider with the speed, flexibility and attention of an agile partner."
        crumbs={[{ label: "Why Choose Us" }]}
      />

      <section className="py-20 sm:py-24">
        <div className={container}>
          <ol className="divide-y divide-ink-200 border-y border-ink-200">
            {company.differentiators.map((item, index) => (
              <li key={item.title} className="grid gap-6 py-12 lg:grid-cols-[8rem_1fr_1.3fr] lg:gap-12">
                <p className="font-display text-6xl font-extrabold leading-none text-brand-500" aria-hidden="true">
                  0{index + 1}
                </p>
                <div className="flex items-start gap-4">
                  <IconBadge name={item.icon} />
                  <h2 className="text-2xl font-bold sm:text-[1.7rem]">{item.title}</h2>
                </div>
                <p className="text-lg text-ink-600">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink-50 py-20 sm:py-24">
        <div className={container}>
          <SectionHeading
            eyebrow="What you can expect"
            title="A partner built for long-term working relationships"
            intro="We aim to be a capable long-term business partner, not simply a service vendor."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {company.reasons.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
        <div className="bg-dots absolute inset-0" aria-hidden="true" />
        <div className={`${container} relative`}>
          <p className="max-w-4xl font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Smarter technology. <span className="text-brand-400">Stronger teams.</span> Greater possibilities.
          </p>
          <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {company.values.map((value) => (
              <div key={value.title} className="border-t border-white/20 pt-5">
                <dt className="font-display text-lg font-bold text-white">{value.title}</dt>
                <dd className="mt-2 text-ink-300">{value.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        title="See how a hybrid team could work for your business."
        primary={{ label: "Partner With Us", href: "/contact" }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Why Choose Us", path: "/why-choose-us" },
        ])}
      />
    </>
  );
}
