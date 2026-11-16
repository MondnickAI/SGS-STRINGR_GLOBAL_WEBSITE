/**
 * Content access layer.
 *
 * All editable website content lives as JSON in the top-level `content/` folder.
 * Pages never read those files directly; they call the functions below. If the
 * content is later moved into a CMS, only this file needs to change.
 *
 * Server-only: uses the filesystem at build/request time.
 */
import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

const CONTENT_DIR = path.join(process.cwd(), "content");

/* ---------------------------------------------------------------- types */

export interface Phone {
  label: string;
  display: string;
  local: string;
  tel: string;
}

export interface Site {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  contact: {
    email: string;
    phones: Phone[];
    address: { lines: string[]; locality: string; region: string; country: string; countryCode: string };
  };
}

export interface Feature {
  title: string;
  text: string;
  icon?: string;
}

/**
 * One homepage hero service: a ring of the radar and a slide in the photo panel.
 * `highlight` is the part of `label` shown in orange.
 */
export interface ServiceLayer {
  label: string;
  highlight: string;
  description: string;
  keywords: string[];
  image: string;
  imageAlt: string;
}

export interface Company {
  positioning: { headline: string; summary: string };
  serviceLayers: ServiceLayer[];
  introduction: string[];
  story: string[];
  commitment: Feature[];
  mission: string;
  vision: string;
  pillars: Feature[];
  aims: Feature[];
  values: Feature[];
  differentiators: Feature[];
  reasons: Feature[];
  expertise: Feature[];
  engagement: Feature[];
}

export interface Service {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  includes: string[];
  problems: string[];
  delivery: string;
  value: string[];
}

interface DivisionFile {
  slug: string;
  order: number;
  title: string;
  shortTitle: string;
  icon: string;
  tagline: string;
  summary: string;
  intro: string;
  seo: { title: string; description: string };
  groups: { title: string; services: string[] }[];
}

export interface Division extends Omit<DivisionFile, "groups"> {
  groups: { title: string; services: Service[] }[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  division: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
}

/* -------------------------------------------------------------- helpers */

function readJson<T>(...segments: string[]): T {
  const file = path.join(CONTENT_DIR, ...segments);
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch (error) {
    throw new Error(`Could not read content file "${path.relative(process.cwd(), file)}": ${String(error)}`);
  }
}

function listJson(...segments: string[]): string[] {
  const dir = path.join(CONTENT_DIR, ...segments);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .sort();
}

/* -------------------------------------------------------------- loaders */

export const getSite = cache((): Site => readJson<Site>("site.json"));

export const getCompany = cache((): Company => readJson<Company>("company.json"));

export const getDivisions = cache((): Division[] =>
  listJson("divisions")
    .map((file) => readJson<DivisionFile>("divisions", file))
    .sort((a, b) => a.order - b.order)
    .map((division) => ({
      ...division,
      groups: division.groups.map((group) => ({
        title: group.title,
        services: group.services.map((slug) => readJson<Service>("services", division.slug, `${slug}.json`)),
      })),
    })),
);

export function getDivision(slug: string): Division | undefined {
  return getDivisions().find((division) => division.slug === slug);
}

export function getDivisionServices(division: Division): Service[] {
  return division.groups.flatMap((group) => group.services);
}

export function getService(divisionSlug: string, serviceSlug: string) {
  const division = getDivision(divisionSlug);
  if (!division) return undefined;
  for (const group of division.groups) {
    const service = group.services.find((item) => item.slug === serviceSlug);
    if (service) return { division, group: group.title, service };
  }
  return undefined;
}

export const getCaseStudies = cache((): CaseStudy[] =>
  listJson("case-studies").map((file) => readJson<CaseStudy>("case-studies", file)),
);

/** Options for the "service interest" selector on the inquiry form. */
export function getServiceInterestOptions(): { value: string; label: string }[] {
  return [
    ...getDivisions().map((division) => ({ value: division.slug, label: division.title })),
    { value: "multiple", label: "More than one service" },
    { value: "not-sure", label: "Not sure yet" },
  ];
}

export function formatAddress(site: Site): string {
  const { lines, region, country } = site.contact.address;
  return [...lines, region, country].join(", ");
}
