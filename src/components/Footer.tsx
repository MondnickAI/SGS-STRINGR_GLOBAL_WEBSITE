import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getDivisions, getSite } from "@/lib/content";
import { container } from "./ui";

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/why-choose-us", label: "Why Choose Us" },
  { href: "/expertise", label: "Our Expertise" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export function Footer() {
  const site = getSite();
  const divisions = getDivisions();
  const { address, phones, email } = site.contact;
  const heading = "font-display text-xs font-bold uppercase tracking-[0.18em] text-white";
  const link = "text-ink-300 transition-colors hover:text-brand-400";

  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className={`${container} grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]`}>
        <div>
          {/* The logo has dark lettering, so it sits on a white plate to stay legible and unaltered. */}
          <Link href="/" className="inline-block rounded-lg bg-white px-4 py-3" aria-label={`${site.name} home`}>
            <Image src="/brand/logo.png" alt={site.name} width={1200} height={384} className="h-14 w-auto" />
          </Link>
          <p className="mt-5 font-display text-sm font-semibold text-white">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-sm">
            IT solutions, virtual assistance and business process outsourcing for organisations worldwide.
          </p>
        </div>

        <nav aria-label="Services">
          <h2 className={heading}>Services</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {divisions.map((division) => (
              <li key={division.slug}>
                <Link href={`/services/${division.slug}`} className={link}>
                  {division.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className={link}>
                All services
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className={heading}>Company</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {COMPANY_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>Contact</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
              <a href={`mailto:${email}`} className={link}>
                {email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
              <span className="flex flex-col gap-1">
                {phones.map((phone) => (
                  <a key={phone.tel} href={`tel:${phone.tel}`} className={link}>
                    {phone.display}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
              <address className="not-italic">
                {address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="block">
                  {address.region}, {address.country}
                </span>
              </address>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className={`${container} flex flex-col gap-2 py-6 text-xs text-ink-400 sm:flex-row sm:justify-between`}>
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-display uppercase tracking-[0.18em]">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
