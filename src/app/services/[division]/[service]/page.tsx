import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink, CheckList, CtaBand, PageHero, container } from "@/components/ui";
import { getDivisions, getDivisionServices, getService, getSite } from "@/lib/content";
import { breadcrumbJsonLd, metaDescription, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";

interface Props {
  params: Promise<{ division: string; service: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getDivisions().flatMap((division) =>
    getDivisionServices(division).map((service) => ({ division: division.slug, service: service.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { division, service } = await params;
  const found = getService(division, service);
  if (!found) return {};
  return pageMetadata({
    title: found.service.title,
    description: metaDescription(found.service.summary, `Part of ${found.division.title} from STRINGR.`),
    path: `/services/${found.division.slug}/${found.service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const slugs = await params;
  const found = getService(slugs.division, slugs.service);
  if (!found) notFound();

  const { division, group, service } = found;
  const site = getSite();
  const path = `/services/${division.slug}/${service.slug}`;
  const related = getDivisionServices(division).filter((item) => item.slug !== service.slug);
  const sectionTitle = "text-2xl font-bold sm:text-3xl";

  return (
    <>
      <PageHero
        eyebrow={group}
        title={service.title}
        intro={service.summary}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: division.title, href: `/services/${division.slug}` },
          { label: service.title },
        ]}
      />

      <div className={`${container} grid gap-14 py-20 sm:py-24 lg:grid-cols-[1fr_22rem] lg:gap-20`}>
        <div className="space-y-16">
          <section aria-labelledby="covers">
            <h2 id="covers" className={sectionTitle}>
              What the service covers
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-ink-200 bg-ink-50 px-5 py-4 font-medium text-ink-900"
                >
                  <span className="h-2 w-2 shrink-0 bg-brand-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="problems">
            <h2 id="problems" className={sectionTitle}>
              The business problems it addresses
            </h2>
            <ul className="mt-7 divide-y divide-ink-200 border-y border-ink-200">
              {service.problems.map((item, index) => (
                <li key={item} className="flex gap-5 py-5">
                  <span className="font-display text-sm font-bold text-brand-700" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="text-lg text-ink-800">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="delivery">
            <h2 id="delivery" className={sectionTitle}>
              How {site.shortName} delivers it
            </h2>
            <p className="mt-6 border-l-4 border-brand-500 pl-6 text-lg leading-relaxed text-ink-700">
              {service.delivery}
            </p>
          </section>

          <section aria-labelledby="value">
            <h2 id="value" className={sectionTitle}>
              The value to your business
            </h2>
            <div className="mt-7 text-lg">
              <CheckList items={service.value} />
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl bg-ink-950 p-7 text-white">
            <h2 className="text-xl font-bold text-white">Interested in this service?</h2>
            <p className="mt-3 text-ink-300">
              Tell us about your requirements and our team will come back to you to arrange a consultation.
            </p>
            <ButtonLink href={`/contact?service=${division.slug}`} className="mt-6 w-full" arrow>
              Discuss Your Project
            </ButtonLink>
            <p className="mt-5 text-sm text-ink-300">
              Or email{" "}
              <a href={`mailto:${site.contact.email}`} className="font-semibold text-brand-400 hover:text-brand-300">
                {site.contact.email}
              </a>
            </p>
          </div>

          <nav aria-label={`More ${division.title}`} className="rounded-xl border border-ink-200 p-7">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-950">
              More in {division.shortTitle}
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/services/${division.slug}/${item.slug}`} className="text-ink-600 hover:text-brand-700">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      <CtaBand
        primary={{ label: "Contact Our Team", href: `/contact?service=${division.slug}` }}
        secondary={{ label: `All ${division.shortTitle} Services`, href: `/services/${division.slug}` }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          serviceType: division.title,
          url: absoluteUrl(path),
          provider: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: division.title, path: `/services/${division.slug}` },
          { name: service.title, path },
        ])}
      />
    </>
  );
}
