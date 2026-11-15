import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, CtaBand, FeatureCard, IconBadge, PageHero, SectionHeading, container } from "@/components/ui";
import { getCaseStudies, getCompany, getDivisions } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Expertise",
  description:
    "How STRINGR GLOBAL SERVICES bridges proven human expertise with AI precision across IT, virtual assistance and contact center solutions.",
  path: "/expertise",
});

export default function ExpertisePage() {
  const company = getCompany();
  const divisions = getDivisions();
  const caseStudies = getCaseStudies();
  const divisionTitle = (slug: string) => divisions.find((division) => division.slug === slug)?.title;

  return (
    <>
      <PageHero
        eyebrow="Our expertise"
        title="Bridging proven expertise with AI precision"
        intro="In IT and contact center solutions, results come from experienced people working with the right technology. That combination is what we deliver."
        crumbs={[{ label: "Our Expertise" }]}
      />

      <section className="py-20 sm:py-24">
        <div className={`${container} grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20`}>
          <div>
            <SectionHeading eyebrow="Our story" title="From a specialised virtual team to a full-service partner" />
            <div className="mt-7 space-y-5 text-lg text-ink-700">
              {company.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="self-center border-l-4 border-brand-500 bg-ink-50 p-8 font-display text-2xl font-bold leading-snug text-ink-950 sm:p-10 sm:text-3xl">
            <p>Human expertise</p>
            <p className="text-brand-700">+ AI innovation</p>
            <p className="mt-3 font-extrabold">= Your business success</p>
          </div>
        </div>
        <div className={`${container} mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4`}>
          {company.expertise.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* Case studies render only when approved entries exist in content/case-studies. */}
      {caseStudies.length > 0 && (
        <section className="border-t border-ink-200 py-20 sm:py-24">
          <div className={container}>
            <SectionHeading eyebrow="Case studies" title="Selected client engagements" />
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {caseStudies.map((study) => (
                <article key={study.slug} id={study.slug} className="rounded-xl border border-ink-200 p-8">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
                    {[study.client, divisionTitle(study.division)].filter(Boolean).join(" · ")}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">{study.title}</h3>
                  <p className="mt-3 text-ink-600">{study.summary}</p>
                  <dl className="mt-6 space-y-4 border-t border-ink-100 pt-6">
                    <div>
                      <dt className="font-display text-sm font-bold text-ink-950">Challenge</dt>
                      <dd className="mt-1 text-ink-600">{study.challenge}</dd>
                    </div>
                    <div>
                      <dt className="font-display text-sm font-bold text-ink-950">Solution</dt>
                      <dd className="mt-1 text-ink-600">{study.solution}</dd>
                    </div>
                    {study.results.length > 0 && (
                      <div>
                        <dt className="font-display text-sm font-bold text-ink-950">Results</dt>
                        <dd className="mt-1 text-ink-600">
                          <ul className="list-disc space-y-1 pl-5">
                            {study.results.map((result) => (
                              <li key={result}>{result}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-ink-50 py-20 sm:py-24">
        <div className={container}>
          <SectionHeading
            eyebrow="Capabilities"
            title="Where our teams work every day"
            intro="Our expertise spans three service divisions. Each can be engaged on its own or combined into a single managed service."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {divisions.map((division) => (
              <article key={division.slug} className="flex flex-col rounded-xl border border-ink-200 bg-white p-8">
                <IconBadge name={division.icon} />
                <h3 className="mt-5 text-xl font-bold">{division.title}</h3>
                <div className="mt-5 space-y-5">
                  {division.groups.map((group) => (
                    <div key={group.title}>
                      <h4 className="font-display text-xs font-bold uppercase tracking-[0.14em] text-brand-700">
                        {group.title}
                      </h4>
                      <ul className="mt-2 space-y-1.5 text-[0.95rem]">
                        {group.services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${division.slug}/${service.slug}`}
                              className="text-ink-700 hover:text-brand-700"
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div>
            <SectionHeading
              eyebrow="Working with us"
              title="How an engagement takes shape"
              intro="Every client is different, so we begin with your requirements rather than a fixed package."
            />
            <div className="mt-8">
              <ButtonLink href="/contact" variant="dark" arrow>
                Ask about relevant experience
              </ButtonLink>
            </div>
          </div>
          <ol className="divide-y divide-ink-200 border-y border-ink-200">
            {company.engagement.map((step, index) => (
              <li key={step.title} className="flex gap-6 py-6">
                <span className="font-display text-2xl font-extrabold text-brand-500" aria-hidden="true">
                  0{index + 1}
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

      <CtaBand
        title="Real people. Smarter solutions."
        text="Talk to our team about your sector, your requirements and the experience most relevant to you."
        primary={{ label: "Contact Our Team", href: "/contact" }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Expertise", path: "/expertise" },
        ])}
      />
    </>
  );
}
