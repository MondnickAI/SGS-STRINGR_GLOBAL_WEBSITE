import type { Metadata } from "next";
import { absoluteUrl } from "./site-url";

export const SITE_NAME = "STRINGR GLOBAL SERVICES";

/** Social sharing image served by src/app/opengraph-image.tsx. */
export const SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}. Smart Solutions. Seamless Operations.`,
};

/**
 * Per-page metadata with a canonical URL and matching Open Graph / Twitter fields.
 * Next.js replaces (does not merge) the parent `openGraph` object, so the shared
 * fields are repeated here.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_GB",
      title,
      description,
      url: absoluteUrl(path),
      images: [SOCIAL_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [SOCIAL_IMAGE.url] },
  };
}

/** Search engines show roughly 160 characters; append the suffix only when it fits. */
export function metaDescription(text: string, suffix = "", limit = 160): string {
  const combined = suffix ? `${text} ${suffix}` : text;
  return combined.length <= limit ? combined : text;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
