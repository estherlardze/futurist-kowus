import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Futurist Daniel Owusu-Koranteng";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/images/hero.jpeg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#071845" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "0 70px" }}>
          <div style={{ width: 90, height: 8, background: "#ffb703", marginBottom: 36 }} />
          <div style={{ fontSize: 70, fontWeight: 700, color: "white", lineHeight: 1.1 }}>
            Futurist Daniel Owusu-Koranteng
          </div>
          <div style={{ fontSize: 30, color: "#ffc633", marginTop: 30, lineHeight: 1.3 }}>
            Author · Human Rights & Environmental Justice Advocate
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={514} height={630} style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
    ),
    size,
  );
}
