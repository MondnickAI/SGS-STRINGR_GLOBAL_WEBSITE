import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getDivisions, getSite } from "@/lib/content";
import { SITE_URL, absoluteUrl } from "@/lib/site-url";
import "./globals.css";

// Fonts are downloaded at build time and served from this site (no requests to Google at runtime).
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const heading = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const site = getSite();
  const title = `${site.name} | IT Solutions, Virtual Assistance & BPO`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${site.name}` },
    description: site.description,
    applicationName: site.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      title,
      description: site.description,
      url: SITE_URL,
    },
    twitter: { card: "summary_large_image", title, description: site.description },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = { themeColor: "#101216", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  const site = getSite();
  const divisions = getDivisions().map(({ slug, title, summary }) => ({ slug, title, summary }));
  const { address, email, phones } = site.contact;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: SITE_URL,
    logo: absoluteUrl("/brand/logo.png"),
    email,
    telephone: phones[0]?.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.lines.join(", "),
      addressRegion: address.region,
      addressCountry: address.countryCode,
    },
    contactPoint: phones.map((phone) => ({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: phone.tel,
      email,
      availableLanguage: "English",
    })),
  };

  return (
    <html lang="en-GB" className={`${body.variable} ${heading.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Header
          siteName={site.name}
          divisions={divisions}
          contact={{
            email,
            phone: { display: phones[0]?.display ?? "", tel: phones[0]?.tel ?? "" },
            location: `${address.locality}, ${address.region}, ${address.country}`,
          }}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
