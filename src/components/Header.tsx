"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonClass, container } from "./ui";

export interface NavDivision {
  slug: string;
  title: string;
  summary: string;
}

export interface HeaderContact {
  email: string;
  phone: { display: string; tel: string };
  location: string;
}

interface NavChild {
  href: string;
  label: string;
  description?: string;
}

interface NavItem {
  label: string;
  /** Omitted for a menu that only groups other pages. */
  href?: string;
  children?: NavChild[];
}

const COMPANY_LINKS: NavChild[] = [
  { href: "/about", label: "About Us", description: "Who we are, our mission, vision and values." },
  { href: "/why-choose-us", label: "Why Choose Us", description: "What sets our hybrid human and AI model apart." },
  { href: "/expertise", label: "Our Expertise", description: "Our experience, capabilities and how we work." },
];

const CTA_LABEL = "Let’s Talk";

export function Header({
  siteName,
  divisions,
  contact,
}: {
  siteName: string;
  divisions: NavDivision[];
  contact: HeaderContact;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const nav: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/services",
      children: divisions.map((division) => ({
        href: `/services/${division.slug}`,
        label: division.title,
        description: division.summary,
      })),
    },
    { label: "Company", children: COMPANY_LINKS },
    { label: "Contact", href: "/contact" },
  ];

  // Close the mobile menu after navigation and on Escape.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const isActive = (item: NavItem) =>
    (item.href ? isCurrent(item.href) : false) || (item.children?.some((child) => isCurrent(child.href)) ?? false);

  const triggerClass = (active: boolean) =>
    `relative inline-flex h-20 items-center px-1 font-display text-[0.95rem] font-semibold transition-colors ${
      active ? "text-ink-950" : "text-ink-600 hover:text-ink-950"
    }`;
  const activeBar = <span className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-500" aria-hidden="true" />;
  const chevron = (
    <ChevronDown
      className="ml-1 h-4 w-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
      aria-hidden="true"
    />
  );
  const topLink = "inline-flex items-center gap-2 transition-colors hover:text-brand-400";

  return (
    <>
      {/* Top information bar (scrolls away; the navigation below stays fixed). */}
      <div className="hidden bg-ink-950 text-[0.8rem] text-ink-300 md:block">
        <div className={`${container} flex h-10 items-center justify-between gap-6`}>
          <ul className="flex items-center gap-7">
            <li>
              <a href={`mailto:${contact.email}`} className={topLink}>
                <Mail className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.tel}`} className={topLink}>
                <Phone className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                {contact.phone.display}
              </a>
            </li>
          </ul>
          <p className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
            {contact.location}
          </p>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/95 shadow-sm shadow-ink-950/[0.03] backdrop-blur">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <div className={`${container} flex h-20 items-center justify-between gap-6`}>
          <Link href="/" className="shrink-0" aria-label={`${siteName} home`}>
            <Image
              src="/brand/logo.png"
              alt={siteName}
              width={1200}
              height={384}
              priority
              className="h-12 w-auto sm:h-14"
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => {
                const active = isActive(item);
                if (!item.children) {
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href ?? "/"}
                        className={triggerClass(active)}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                        {active && activeBar}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item.label} className="group relative">
                    {item.href ? (
                      <Link href={item.href} className={triggerClass(active)}>
                        {item.label}
                        {chevron}
                        {active && activeBar}
                      </Link>
                    ) : (
                      <button type="button" aria-haspopup="true" className={`${triggerClass(active)} cursor-default`}>
                        {item.label}
                        {chevron}
                        {active && activeBar}
                      </button>
                    )}
                    <div className="invisible absolute left-1/2 top-full w-[25rem] -translate-x-1/2 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="rounded-b-xl border border-t-[3px] border-ink-200 border-t-brand-500 bg-white p-2 shadow-xl shadow-ink-950/10">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={isCurrent(child.href) ? "page" : undefined}
                              className="block rounded-lg px-4 py-3 transition-colors hover:bg-ink-50"
                            >
                              <span className="block font-display text-sm font-bold text-ink-950">{child.label}</span>
                              {child.description && (
                                <span className="mt-0.5 block text-sm leading-snug text-ink-500">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={buttonClass("primary", "hidden px-7 py-3 uppercase tracking-wider sm:inline-flex")}
            >
              {CTA_LABEL}
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-ink-200 text-ink-950 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <nav
          id="mobile-menu"
          aria-label="Mobile"
          hidden={!menuOpen}
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-ink-200 bg-white lg:hidden"
        >
          <ul className={`${container} divide-y divide-ink-100 py-2`}>
            {nav.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`block py-3.5 font-display text-base font-semibold ${
                      isCurrent(item.href) ? "text-brand-700" : "text-ink-950"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <p className="pt-3.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-500">
                    {item.label}
                  </p>
                )}
                {item.children && (
                  <ul className="mb-3 mt-1 border-l-2 border-brand-500 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`block py-2 text-[0.95rem] ${
                            isCurrent(child.href) ? "font-semibold text-brand-700" : "text-ink-600"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="py-4">
              <Link href="/contact" className={buttonClass("primary", "w-full uppercase tracking-wider")}>
                {CTA_LABEL}
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
