/**
 * Content integrity checks. These protect against mistakes when content files
 * are edited by hand: missing fields, broken references and duplicate slugs.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const CONTENT = path.join(process.cwd(), "content");
const read = (...segments: string[]) => JSON.parse(fs.readFileSync(path.join(CONTENT, ...segments), "utf8"));
const jsonFiles = (...segments: string[]) =>
  fs.readdirSync(path.join(CONTENT, ...segments)).filter((name) => name.endsWith(".json"));

// Icon names are read from the source so this test needs no React rendering.
const iconSource = fs.readFileSync(path.join(process.cwd(), "src/components/Icon.tsx"), "utf8");
const iconMap = iconSource.slice(iconSource.indexOf("const ICONS"), iconSource.indexOf("};", iconSource.indexOf("const ICONS")));
const ICONS = new Set([...iconMap.matchAll(/^\s+"?([a-z-]+)"?:/gm)].map((match) => match[1]));

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const nonEmpty = (value: unknown) => typeof value === "string" && value.trim().length > 0;

describe("site.json", () => {
  const site = read("site.json");

  it("has the required company and contact details", () => {
    expect(nonEmpty(site.name)).toBe(true);
    expect(nonEmpty(site.tagline)).toBe(true);
    expect(site.contact.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(site.contact.phones.length).toBeGreaterThan(0);
    for (const phone of site.contact.phones) expect(phone.tel).toMatch(/^\+\d{8,15}$/);
    expect(site.contact.address.lines.length).toBeGreaterThan(0);
  });

  it("lists known social networks once each, with https URLs, on-site placeholders or left blank", () => {
    const networks = site.social.map((profile: { network: string }) => profile.network);
    expect(new Set(networks).size).toBe(networks.length);
    for (const profile of site.social) {
      expect(["facebook", "linkedin", "x"]).toContain(profile.network);
      expect(nonEmpty(profile.label)).toBe(true);
      if (profile.url !== "") expect(profile.url).toMatch(/^(https:\/\/\S+|\/\S*)$/);
    }
  });
});

describe("company.json", () => {
  const company = read("company.json");

  it("uses only known icons", () => {
    const lists = ["commitment", "pillars", "aims", "values", "differentiators", "reasons", "expertise"];
    for (const key of lists) {
      for (const item of company[key]) {
        expect(nonEmpty(item.title) && nonEmpty(item.text), `${key}: ${item.title}`).toBe(true);
        expect(ICONS.has(item.icon), `${key}: unknown icon "${item.icon}"`).toBe(true);
      }
    }
  });
});

describe("divisions and services", () => {
  const divisions = jsonFiles("divisions").map((file) => ({ file, data: read("divisions", file) }));

  it("has at least one division and unique slugs matching the file names", () => {
    expect(divisions.length).toBeGreaterThan(0);
    const slugs = divisions.map(({ data }) => data.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const { file, data } of divisions) {
      expect(data.slug).toMatch(SLUG);
      expect(`${data.slug}.json`).toBe(file);
      expect(ICONS.has(data.icon), `${file}: unknown icon "${data.icon}"`).toBe(true);
      expect(nonEmpty(data.seo.title) && nonEmpty(data.seo.description)).toBe(true);
      expect(data.seo.description.length, `${file}: meta description too long`).toBeLessThanOrEqual(165);
    }
  });

  it("references only service files that exist, and lists every service file", () => {
    for (const { data } of divisions) {
      const referenced: string[] = data.groups.flatMap((group: { services: string[] }) => group.services);
      const onDisk = jsonFiles("services", data.slug).map((file) => file.replace(/\.json$/, ""));
      expect(new Set(referenced).size, `${data.slug}: duplicate service reference`).toBe(referenced.length);
      expect([...referenced].sort()).toEqual([...onDisk].sort());
    }
  });

  it("has complete, valid service files", () => {
    for (const { data } of divisions) {
      for (const file of jsonFiles("services", data.slug)) {
        const service = read("services", data.slug, file);
        const label = `${data.slug}/${file}`;
        expect(`${service.slug}.json`, label).toBe(file);
        expect(service.slug, label).toMatch(SLUG);
        expect(ICONS.has(service.icon), `${label}: unknown icon "${service.icon}"`).toBe(true);
        for (const key of ["title", "summary", "delivery"]) expect(nonEmpty(service[key]), `${label}: ${key}`).toBe(true);
        for (const key of ["includes", "problems", "value"]) {
          expect(Array.isArray(service[key]) && service[key].length > 0, `${label}: ${key}`).toBe(true);
          expect(service[key].every(nonEmpty), `${label}: ${key} has an empty item`).toBe(true);
        }
      }
    }
  });
});

describe("case studies", () => {
  it("are complete and reference a real division", () => {
    const divisionSlugs = jsonFiles("divisions").map((file) => file.replace(/\.json$/, ""));
    for (const file of jsonFiles("case-studies")) {
      const study = read("case-studies", file);
      expect(`${study.slug}.json`, file).toBe(file);
      for (const key of ["title", "client", "summary", "challenge", "solution"]) {
        expect(nonEmpty(study[key]), `${file}: ${key}`).toBe(true);
      }
      expect(divisionSlugs, `${file}: unknown division`).toContain(study.division);
      expect(Array.isArray(study.results), `${file}: results`).toBe(true);
    }
  });
});
