import type { CSSProperties } from "react";
import type { ServiceLayer } from "@/lib/content";

/*
  Homepage hero radar. A pulse leaves the centre and reaches one ring every two seconds; each ring
  lights up and its service label appears. The motion is CSS only (see "Hero radar" in globals.css).
  `--k` is the ring number, counted from the centre, and sets both the ring's size and its delay.
*/

function step(k: number): CSSProperties {
  return { "--k": k } as CSSProperties;
}

/** Background layer: concentric rings, the expanding pulse and its origin. Sits behind the hero text. */
export function HeroRadarRings({ count }: { count: number }) {
  return (
    <div
      className="hero-radar pointer-events-none absolute left-6 top-[calc(50%-8rem)] aspect-square w-[38rem] -translate-x-1/2 -translate-y-1/2 sm:top-[calc(50%-10rem)] lg:left-[11.5rem] lg:top-1/2 lg:w-[60rem]"
      style={{ "--rings": count } as CSSProperties}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className={`radar-ring radar-ring-${index + 1}`} style={step(index + 1)} />
      ))}
      <span className="radar-wave" />
      <span className="radar-wave radar-wave-echo" />
      <span className="radar-origin" />
    </div>
  );
}

/** A service name with its highlighted words in orange. */
export function LayerLabel({ layer }: { layer: ServiceLayer }) {
  const at = layer.highlight ? layer.label.indexOf(layer.highlight) : -1;
  if (at < 0) return <>{layer.label}</>;
  return (
    <>
      {layer.label.slice(0, at)}
      <span className="text-brand-400">{layer.highlight}</span>
      {layer.label.slice(at + layer.highlight.length)}
    </>
  );
}

/** Label layer: one service name at a time, in step with the ring the pulse has just reached. */
export function HeroRadarLabels({ layers }: { layers: ServiceLayer[] }) {
  return (
    <ul className="radar-labels pointer-events-none absolute bottom-6 left-0 right-0 lg:bottom-8" aria-hidden="true">
      {layers.map((layer, index) => (
        <li
          key={layer.label}
          className={`radar-label radar-ring-${index + 1} font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white`}
          style={step(index + 1)}
        >
          <span className="radar-label-dot" />
          <span>
            <LayerLabel layer={layer} />
          </span>
        </li>
      ))}
    </ul>
  );
}
