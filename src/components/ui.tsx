import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";

/* ---------------------------------------------------------------- buttons */

type ButtonVariant = "primary" | "dark" | "outline" | "outline-light";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-display text-sm font-semibold tracking-wide transition-colors duration-200";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-ink-950 hover:bg-brand-400",
  dark: "bg-ink-950 text-white hover:bg-ink-800",
  outline: "border border-ink-300 text-ink-950 hover:border-ink-950 hover:bg-ink-50",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white/10",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = ""): string {
  return `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${extra}`.trim();
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClass(variant, `group ${className}`)}>
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      )}
    </Link>
  );
}

export function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 font-display text-sm font-semibold ${
        light ? "text-brand-400 hover:text-brand-300" : "text-brand-700 hover:text-ink-950"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

/* --------------------------------------------------------------- headings */

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.2em] ${
        light ? "text-brand-400" : "text-brand-700"
      }`}
    >
      <span className="h-0.5 w-8 bg-brand-500" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-4 text-3xl font-bold sm:text-4xl ${light ? "text-white" : ""}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg ${light ? "text-ink-300" : "text-ink-600"}`}>{intro}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ cards */

export function IconBadge({ name, light = false }: { name?: string; light?: boolean }) {
  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
        light ? "bg-white/10 text-brand-400" : "bg-ink-950 text-brand-400"
      }`}
    >
      <Icon name={name} className="h-6 w-6" />
    </span>
  );
}

export function FeatureCard({
  icon,
  title,
  text,
  light = false,
}: {
  icon?: string;
  title: string;
  text: string;
  light?: boolean;
}) {
  return (
    <div className={`h-full rounded-xl border p-7 ${light ? "border-white/10 bg-white/[0.04]" : "border-ink-200 bg-white"}`}>
      <IconBadge name={icon} light={light} />
      <h3 className={`mt-5 text-lg font-bold ${light ? "text-white" : ""}`}>{title}</h3>
      <p className={`mt-2.5 text-[0.95rem] ${light ? "text-ink-300" : "text-ink-600"}`}>{text}</p>
    </div>
  );
}

/* ------------------------------------------------------------- page parts */

export interface Crumb {
  label: string;
  href?: string;
}

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="bg-dots absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-28 top-0 hidden h-full w-80 -skew-x-[20deg] bg-brand-500 lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute right-60 top-0 hidden h-full w-4 -skew-x-[20deg] bg-brand-300/80 lg:block"
        aria-hidden="true"
      />
      <div className={`${container} relative py-16 sm:py-20 lg:py-24`}>
        <div className="max-w-3xl lg:max-w-[46rem]">
          {crumbs && crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                {crumbs.map((crumb) => (
                  <li key={crumb.label} className="flex items-center gap-2">
                    <span aria-hidden="true">/</span>
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-white">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-ink-200">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
          <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
          {intro && <p className="mt-6 text-lg text-ink-300 sm:text-xl">{intro}</p>}
          {children && <div className="mt-9 flex flex-wrap gap-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Let us talk about what your business needs next.",
  text = "Tell us about your requirements and our team will come back to you to arrange a consultation.",
  primary = { label: "Request a Consultation", href: "/contact" },
  secondary = { label: "Explore Our Services", href: "/services" },
}: {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-500">
      <div
        className="absolute -right-24 top-0 hidden h-full w-64 -skew-x-[20deg] bg-brand-400 md:block"
        aria-hidden="true"
      />
      <div
        className={`${container} relative flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between`}
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-ink-900">{text}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={primary.href} variant="dark" arrow>
            {primary.label}
          </ButtonLink>
          {secondary && (
            <Link href={secondary.href} className={buttonClass("outline", "border-ink-950/50 hover:bg-ink-950/10")}>
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon name="check-circle" className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
          <span className={light ? "text-ink-200" : "text-ink-700"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
