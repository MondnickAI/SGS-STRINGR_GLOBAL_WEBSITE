import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/content";
import { Icon } from "./Icon";

export function ServiceCard({ divisionSlug, service }: { divisionSlug: string; service: Service }) {
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-ink-200 bg-white p-6 transition-colors duration-200 hover:border-ink-950">
      <Icon name={service.icon} className="h-7 w-7 text-brand-600" />
      <h3 className="mt-4 text-lg font-bold">
        <Link href={`/services/${divisionSlug}/${service.slug}`} className="after:absolute after:inset-0">
          {service.title}
        </Link>
      </h3>
      <p className="mt-2 text-[0.95rem] text-ink-600">{service.summary}</p>
      <p className="mt-auto flex items-center gap-1.5 pt-5 font-display text-sm font-semibold text-brand-700">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </p>
    </article>
  );
}
