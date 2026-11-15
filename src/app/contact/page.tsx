import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, container } from "@/components/ui";
import { getServiceInterestOptions, getSite } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact STRINGR GLOBAL SERVICES to discuss IT services, virtual assistant support or contact center and BPO requirements. Send a business inquiry to our team.",
  path: "/contact",
});

function Detail({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-ink-950">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">{title}</h3>
        <div className="mt-1.5 text-ink-200">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  const site = getSite();
  const { email, phones, address } = site.contact;
  const iconProps = { className: "h-5 w-5", "aria-hidden": true, strokeWidth: 1.75 } as const;
  const link = "hover:text-brand-400";

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Discuss your project with our team"
        intro="Tell us what you need to achieve. We will review your inquiry and come back to you to arrange a consultation."
        crumbs={[{ label: "Contact Us" }]}
      />

      <section className="py-16 sm:py-24">
        <div className={`${container} grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20`}>
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Send a business inquiry</h2>
            <div className="mt-8">
              <ContactForm services={getServiceInterestOptions()} email={email} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-xl bg-ink-950 p-8 sm:p-9">
              <div className="bg-dots absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <h2 className="text-2xl font-bold text-white">Contact information</h2>
                <ul className="mt-8 space-y-7">
                  <Detail icon={<Mail {...iconProps} />} title="Email">
                    <a href={`mailto:${email}`} className={link}>
                      {email}
                    </a>
                  </Detail>
                  <Detail icon={<Phone {...iconProps} />} title="Phone">
                    <ul className="space-y-1">
                      {phones.map((phone) => (
                        <li key={phone.tel}>
                          <a href={`tel:${phone.tel}`} className={link}>
                            {phone.display}
                          </a>{" "}
                          <span className="text-sm text-ink-400">({phone.label})</span>
                        </li>
                      ))}
                    </ul>
                  </Detail>
                  <Detail icon={<MapPin {...iconProps} />} title="Office">
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
                  </Detail>
                  <Detail icon={<Clock {...iconProps} />} title="Time zone">
                    Philippine Standard Time (UTC+8)
                  </Detail>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ])}
      />
    </>
  );
}
