import { ImageResponse } from "next/og";
import { getSite } from "@/lib/content";

export const alt = "STRINGR GLOBAL SERVICES. Smart Solutions. Seamless Operations.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social sharing image, generated at build time from the site content. */
export default function OpengraphImage() {
  const site = getSite();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "#101216",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -140,
            top: 0,
            width: 380,
            height: 630,
            background: "#f7931e",
            transform: "skewX(-20deg)",
          }}
        />
        <div style={{ display: "flex", width: 96, height: 8, background: "#f7931e", marginBottom: 36 }} />
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, color: "#f7931e", lineHeight: 1 }}>STRINGR</div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
          GLOBAL SERVICES
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#dfe2e6", marginTop: 34 }}>{site.tagline}</div>
        <div style={{ display: "flex", fontSize: 26, color: "#99a0ab", marginTop: 18 }}>
          IT Solutions · Virtual Assistance · Business Process Outsourcing
        </div>
      </div>
    ),
    size,
  );
}
