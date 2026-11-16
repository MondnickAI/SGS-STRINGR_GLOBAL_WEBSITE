import type { CSSProperties } from "react";
import Image from "next/image";
import { LayerLabel } from "@/components/HeroRadar";
import type { ServiceLayer } from "@/lib/content";

/*
  Homepage hero slideshow. Each service gets a photo with its title, description and keywords over
  a dark gradient; slides cross-fade in turn. The motion is CSS only (see "Hero slides" in
  globals.css). `--n` is the slide's position, counted from zero, and sets its delay.
*/
export function HeroSlides({ layers }: { layers: ServiceLayer[] }) {
  return (
    <>
      {layers.map((layer, index) => (
        <div key={layer.label} className="hero-slide" style={{ "--n": index } as CSSProperties}>
          <Image
            src={layer.image}
            alt={layer.imageAlt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/55 via-ink-950/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/60 to-transparent" />

          {/* The left inset keeps the text clear of the slanted edge on wide screens. */}
          <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-7 lg:bottom-10 lg:left-[24%] lg:right-8">
            <p className="hero-slide-text font-display text-xl font-extrabold leading-tight text-white sm:text-2xl xl:text-3xl">
              <LayerLabel layer={layer} />
            </p>
            <p className="hero-slide-text hero-slide-text-late mt-2 max-w-xl text-[0.8rem] leading-snug text-ink-100 sm:mt-3 sm:text-base sm:leading-relaxed">
              {layer.description}
            </p>
            <ul className="hero-slide-text hero-slide-text-late mt-3 flex flex-wrap gap-x-3 gap-y-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.14em] text-brand-400 sm:mt-4 sm:text-xs">
              {layer.keywords.map((keyword, at) => (
                <li key={keyword} className="flex items-center gap-3">
                  {at > 0 && <span className="h-3 w-px bg-white/40" aria-hidden="true" />}
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}
