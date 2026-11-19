import Image from "next/image";
import type { HTMLAttributes } from "react";
import { ALT } from "@/lib/alt";

type Props = HTMLAttributes<HTMLDivElement> & {
  src: string;
  /** Wie breit das Bild auf dem Bildschirm maximal dargestellt wird – steuert, welche Größe ausgeliefert wird */
  sizes?: string;
  /** Bild sofort laden (z. B. Hero) */
  eager?: boolean;
  alt?: string;
  /** Bildqualität (muss in next.config images.qualities stehen) */
  quality?: 75 | 85;
  /** Bildausschnitt im Hochformat (Handy), z. B. "35% 50%" */
  focus?: string;
  [key: `data-${string}`]: string | undefined;
};

/**
 * Flächenfüllendes Bild. Die PNG-Originale bleiben unverändert im Repo; Next.js liefert je nach
 * Bildschirm automatisch verkleinerte AVIF/WebP-Versionen aus.
 */
export function BgImage({ src, sizes = "100vw", eager = false, alt, quality = 75, focus, className = "", style, ...rest }: Props) {
  // Ohne eigenes alt greift die zentrale Beschreibung aus lib/alt.ts – leer nur, wenn dort nichts steht
  const text = alt ?? ALT[src] ?? "";
  return (
    <div className={`${className} pm-img`} style={focus ? { ...style, ["--focus" as string]: focus } : style} {...rest}>
      <Image src={src} alt={text} fill sizes={sizes} quality={quality} className="pm-img__el"
        {...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {})} />
    </div>
  );
}
