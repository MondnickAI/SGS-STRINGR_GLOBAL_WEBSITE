import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCard } from "@/components/ServiceCard";
import { ButtonLink, CtaBand, PageHero, SectionHeading, container } from "@/components/ui";
import { getCompany, getDivision, getDivisions } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ division: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getDivisions().map((division) => ({ division: division.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const division = getDivision((await params).division);
  if (!division) return {};
  return pageMetadata({
    title: division.seo.title,
    description: division.seo.description,
    path: `/services/${division.slug}`,
  });
}

export default async function DivisionPage({ params }: Props) {
  const division = getDivision((await params).division);
  if (!division) notFound();

  const others = getDivisions().filter((item) => item.slug !== division.slug);
  const { differentiators } = getCompany();
  // Each division has a matching differentiator in the company profile.
  const highlight =
    division.slug === "it-technical-services"
      ? differentiators[1]
      : division.slug === "contact-center-bpo-services"
        ? differentiators[0]
        : differentiators[2];

  return (
    <>
      <PageHero
        eyebrow={division.tagline}
        title={division.title}
        intro={division.intro}
        crumbs={[{ label: "Services", href: "/services" }, { label: division.title }]}
      >
        <ButtonLink href={`/contact?service=${division.slug}`} arrow>
          Discuss Your Project
        </ButtonLink>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className={`${container} space-y-16`}>
          {division.groups.map((group) => (
            <div key={group.title}>
              <div className="flex items-center gap-5">
                <h2 className="text-2xl font-bold sm:text-3xl">{group.title}</h2>
                <span className="h-px flex-1 bg-ink-200" aria-hidden="true" />
              </div>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.services.map((service) => (
                  <li key={service.slug}>
                    <ServiceCard divisionSlug={division.slug} service={service} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {highlight && (
        <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
          <div className="bg-dots absolute inset-0" aria-hidden="true" />
          <div className={`${container} relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20`}>
            <SectionHeading light eyebrow="The STRINGR difference" title={highlight.title} />
            <p className="border-l-4 border-brand-500 pl-7 text-xl leading-relaxed text-ink-200">{highlight.text}</p>
          </div>
        </section>
      )}

      <section className="py-20 sm:py-24">
        <div className={container}>
          <SectionHeading eyebrow="Related services" title="Combine with our other divisions" />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {others.map((item) => (
              <li key={item.slug} className="rounded-xl border border-ink-200 p-7">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-ink-600">{item.summary}</p>
                <div className="mt-5">
                  <ButtonLink href={`/services/${item.slug}`} variant="outline" arrow>
                    Explore {item.shortTitle}
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`Talk to us about ${division.title}.`}
        primary={{ label: "Request a Consultation", href: `/contact?service=${division.slug}` }}
        secondary={{ label: "All Services", href: "/services" }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: division.title, path: `/services/${division.slug}` },
        ])}
      />
    </>
  );
}
