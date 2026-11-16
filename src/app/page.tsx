import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroRadarLabels, HeroRadarRings } from "@/components/HeroRadar";
import { HeroSlides } from "@/components/HeroSlides";
import { Icon } from "@/components/Icon";
import {
  ButtonLink,
  CtaBand,
  Eyebrow,
  FeatureCard,
  IconBadge,
  SectionHeading,
  TextLink,
  container,
} from "@/components/ui";
import { getCaseStudies, getCompany, getDivisions, getDivisionServices, getSite } from "@/lib/content";

export default function HomePage() {
  const site = getSite();
  const company = getCompany();
  const divisions = getDivisions();
  const caseStudies = getCaseStudies();

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="bg-dots absolute inset-0" aria-hidden="true" />
        {/* Concentric radar rings behind the headline. */}
        <HeroRadarRings count={company.serviceLayers.length} />

        <div className={`${container} relative`}>
          <div className="animate-rise relative py-16 sm:py-20 lg:max-w-[47%] lg:pb-24 lg:pt-32 xl:pb-28 xl:pt-36">
            <HeroRadarLabels layers={company.serviceLayers} />
            <Eyebrow light>IT Solutions · Virtual Assistance · BPO</Eyebrow>
            <h1 className="mt-6 text-[2.35rem] font-extrabold leading-[1.08] text-white sm:text-5xl xl:text-6xl">
              Skilled people. Intelligent technology. <span className="text-brand-500">Seamless operations.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-ink-300 sm:text-xl">{company.positioning.summary}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/contact" arrow>
                Discuss Your Project
              </ButtonLink>
              <ButtonLink href="/services" variant="outline-light">
                Explore Our Services
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Photo with a slanted edge. Stacked under the text on small screens. */}
        <div className="relative h-64 sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]">
          <div className="absolute inset-0 lg:[clip-path:polygon(30%_0,100%_0,100%_100%,8%_100%)]">
            <HeroSlides layers={company.serviceLayers} />
          </div>
          <div className="absolute inset-x-0 top-0 h-1.5 overflow-hidden bg-brand-500 lg:hidden" aria-hidden="true">
            <span className="hero-flow-strip" />
          </div>
        </div>

        {/*
          Hero divider: the folded orange arrowhead from the SGS logo. A horizontal bar runs along the
          top of the hero from the left edge and folds into the diagonal that separates the text from the photo.
          Coordinates are percentages of the hero, so the shape scales with it.
        */}
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* User-space stops, so the bar's right-hand part keeps its colours however far left it runs. */}
            <linearGradient id="hero-arrow-bar" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="63" y2="0">
              <stop offset="0" stopColor="#ee6312" />
              <stop offset="0.589" stopColor="#f26a1b" />
              <stop offset="0.815" stopColor="#fb9a1c" />
              <stop offset="1" stopColor="#ffcb1f" />
            </linearGradient>
            <linearGradient id="hero-arrow-leg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fb9a1c" />
              <stop offset="1" stopColor="#ee6312" />
            </linearGradient>
          </defs>
          <polygon points="0,0 63,0 56.03,12 0,12" fill="url(#hero-arrow-bar)" />
          <polygon points="63,0 51.56,100 45.96,100 56.03,12" fill="url(#hero-arrow-leg)" />
        </svg>

        {/* Light flowing through the arrowhead (see "Hero light flow" in globals.css). */}
        <div className="hero-flow hero-flow-bar hidden lg:block" aria-hidden="true">
          <div className="hero-flow-track hero-flow-x">
            <span className="hero-flow-band-x" />
          </div>
          <div className="hero-flow-track hero-flow-x hero-flow-late">
            <span className="hero-flow-band-x hero-flow-band-soft" />
          </div>
        </div>
        <div className="hero-flow hero-flow-leg hidden lg:block" aria-hidden="true">
          <div className="hero-flow-track hero-flow-up">
            <span className="hero-flow-band-up" />
          </div>
          <div className="hero-flow-track hero-flow-up hero-flow-late">
            <span className="hero-flow-band-up hero-flow-band-soft" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ commitment */}
      <section aria-label="Our commitment" className="border-y border-ink-200 bg-ink-50">
        <ul className={`${container} grid divide-y divide-ink-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0`}>
          {company.commitment.map((item) => (
            <li key={item.title} className="flex gap-4 py-7 sm:px-7 sm:first:pl-0 sm:last:pr-0">
              <Icon name={item.icon} className="mt-0.5 h-7 w-7 shrink-0 text-brand-600" />
              <div>
                <p className="font-display text-base font-bold text-ink-950">{item.title}</p>
                <p className="mt-1 text-sm text-ink-600">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* -------------------------------------------------------- services */}
      <section className="py-20 sm:py-28">
        <div className={container}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="What we do"
              title="Technology and talent, delivered as one service"
              intro="Three specialist divisions work together so you can outsource a single task, a whole function, or the technology that supports it."
            />
            <TextLink href="/services">View all services</TextLink>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {divisions.map((division) => {
              const services = getDivisionServices(division);
              return (
                <article
                  key={division.slug}
                  className="group relative flex flex-col rounded-xl border border-ink-200 bg-white p-8 transition-shadow duration-300 hover:shadow-xl hover:shadow-ink-950/[0.07]"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 rounded-t-xl bg-brand-500 transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <IconBadge name={division.icon} />
                  <h3 className="mt-6 text-xl font-bold">
                    <Link href={`/services/${division.slug}`} className="after:absolute after:inset-0">
                      {division.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-ink-600">{division.summary}</p>
                  <ul className="mt-6 space-y-2 border-t border-ink-100 pt-6 text-sm text-ink-700">
                    {services.slice(0, 5).map((service) => (
                      <li key={service.slug} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-500" aria-hidden="true" />
                        {service.title}
                      </li>
                    ))}
                    {services.length > 5 && (
                      <li className="pl-4 text-ink-500">and {services.length - 5} more services</li>
                    )}
                  </ul>
                  <p className="mt-auto flex items-center gap-1.5 pt-8 font-display text-sm font-semibold text-brand-700">
                    Explore {division.shortTitle}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ human + AI */}
      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
        <div className="bg-dots absolute inset-0" aria-hidden="true" />
        <div className={`${container} relative`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <SectionHeading
              light
              eyebrow="How we work"
              title="Real people, supported by smarter technology"
              intro="We deliver outsourcing and technology solutions by combining two forces: experienced human intelligence and modern artificial intelligence. People provide judgement, empathy and accountability. Technology adds speed, consistency and insight."
            />
            <div className="border-l-4 border-brand-500 pl-7 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
              <p>Human expertise</p>
              <p className="text-brand-400">+ AI innovation</p>
              <p className="mt-3 text-3xl font-extrabold sm:text-4xl">= Your business success</p>
            </div>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {company.expertise.map((item) => (
              <FeatureCard key={item.title} {...item} light />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- why choose us */}
      <section className="py-20 sm:py-28">
        <div className={container}>
          <SectionHeading
            eyebrow={`Why choose ${site.shortName}`}
            title="Enterprise capability with the responsiveness of an agile partner"
          />
          <ol className="mt-14 grid gap-x-10 gap-y-12 lg:grid-cols-3">
            {company.differentiators.map((item, index) => (
              <li key={item.title} className="border-t-2 border-ink-950 pt-6">
                <p className="font-display text-5xl font-extrabold text-brand-500" aria-hidden="true">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-ink-600">{item.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <ButtonLink href="/why-choose-us" variant="outline" arrow>
              Why clients choose us
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- expertise */}
      <section className="bg-ink-50 py-20 sm:py-28">
        <div className={`${container} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
          <div className="relative mr-5 sm:mr-8 lg:mr-0">
            <div className="absolute -bottom-5 -right-5 h-2/3 w-2/3 bg-brand-500 sm:-bottom-7 sm:-right-7" aria-hidden="true" />
            <div
              className="absolute -left-4 -top-4 h-24 w-24 border-l-4 border-t-4 border-ink-950 sm:-left-6 sm:-top-6"
              aria-hidden="true"
            />
            <Image
              src="/images/team-collaboration.jpg"
              alt="A team collaborating around a table with laptops"
              width={1400}
              height={919}
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="relative aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow="Our expertise" title="Proven experience across IT and contact center operations" />
            <div className="mt-6 space-y-5 text-lg text-ink-700">
              {company.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <ButtonLink href="/expertise" variant="dark" arrow>
                {caseStudies.length > 0 ? "View case studies" : "See our expertise"}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Partner with a team that works as an extension of yours."
        text="Tell us what you need to achieve. We will come back to you to arrange a consultation and recommend the right mix of people and technology."
        primary={{ label: "Partner With Us", href: "/contact" }}
        secondary={{ label: "About STRINGR", href: "/about" }}
      />
    </>
  );
}
