import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, CtaBand, IconBadge, PageHero, container } from "@/components/ui";
import { getDivisions } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Explore STRINGR GLOBAL SERVICES: IT and technical services, virtual assistant services, and contact center and BPO services for international businesses.",
  path: "/services",
});

export default function ServicesPage() {
  const divisions = getDivisions();

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="IT solutions, virtual assistance and BPO from one accountable partner"
        intro="Choose a single service or combine several. Each one is delivered by experienced professionals and supported by modern technology."
        crumbs={[{ label: "Services" }]}
      >
        <ButtonLink href="/contact" arrow>
          Request a Consultation
        </ButtonLink>
      </PageHero>

      <nav aria-label="Service divisions" className="border-b border-ink-200 bg-ink-50">
        <ul className={`${container} flex flex-wrap gap-x-8 gap-y-2 py-4 font-display text-sm font-semibold`}>
          {divisions.map((division) => (
            <li key={division.slug}>
              <a href={`#${division.slug}`} className="text-ink-700 hover:text-brand-700">
                {division.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {divisions.map((division, index) => (
        <section
          key={division.slug}
          id={division.slug}
          className={`py-20 sm:py-24 ${index % 2 === 1 ? "bg-ink-50" : ""}`}
        >
          <div className={`${container} grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20`}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <IconBadge name={division.icon} />
              <h2 className="mt-6 text-3xl font-bold sm:text-4xl">{division.title}</h2>
              <p className="mt-3 font-display text-base font-semibold text-brand-700">{division.tagline}</p>
              <p className="mt-5 text-lg text-ink-600">{division.intro}</p>
              <div className="mt-8">
                <ButtonLink href={`/services/${division.slug}`} variant="dark" arrow>
                  Explore {division.shortTitle}
                </ButtonLink>
              </div>
            </div>

            <div className="space-y-10">
              {division.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="border-b-2 border-ink-950 pb-3 font-display text-sm font-bold uppercase tracking-[0.14em]">
                    {group.title}
                  </h3>
                  <ul className="divide-y divide-ink-200">
                    {group.services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${division.slug}/${service.slug}`}
                          className="group block py-4 transition-colors"
                        >
                          <span className="font-display text-base font-bold text-ink-950 group-hover:text-brand-700">
                            {service.title}
                          </span>
                          <span className="mt-1 block text-[0.95rem] text-ink-600">{service.summary}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBand
        title="Not sure which service fits?"
        text="Describe the challenge and we will recommend the right combination of people, process and technology."
        primary={{ label: "Contact Our Team", href: "/contact" }}
        secondary={null}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
