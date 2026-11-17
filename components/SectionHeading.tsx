"use client";
import { lines, tidy, tidyNode } from "@/lib/typo";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, splitHeading } from "@/lib/gsap";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: ReactNode;
  title?: ReactNode;
  highlight?: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  level?: 1 | 2 | 3;
  size?: "hero" | "h1" | "h2";
  maxWidth?: number;
  style?: CSSProperties;
  /** "scroll": animiert beim Einscrollen · "intro": wird vom Hero-Timeline gesteuert · "none" */
  motion?: "scroll" | "intro" | "none";
};

export function SectionHeading({
  eyebrow, title, highlight, intro, align = "left", dark = false, level = 2, size = "h2",
  maxWidth = 760, style, motion = "scroll",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  const hiddenCls = motion === "scroll" ? "pm-reveal" : motion === "intro" ? "pm-intro" : "";

  useGSAP(() => {
    if (motion !== "scroll" || !ref.current) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Erst kurz bevor die Überschrift ins Bild kommt vorbereiten: Das Zerlegen in Zeilen misst den Text aus
      // und kostete beim Laden für alle Überschriften zusammen spürbar Zeit (PageSpeed „Total Blocking Time“).
      let split: { revert: () => void } | undefined;
      let tl: gsap.core.Timeline | undefined;
      const setup = () => {
      const rules = root.querySelectorAll(".eyebrow__rule");
      const eyebrowTxt = root.querySelector(".eyebrow__text");
      const titleEl = root.querySelector(".sh__title");
      const introEl = root.querySelector(".sh__intro");
      gsap.set(root.querySelectorAll(".pm-reveal"), { visibility: "visible" });

      const st = { trigger: root, start: "top 86%", once: true };
      tl = gsap.timeline({ scrollTrigger: st });
      if (rules.length) tl.from(rules, { scaleX: 0, duration: 0.9, ease: "power3.inOut" }, 0);
      if (eyebrowTxt) tl.from(eyebrowTxt, { opacity: 0, x: align === "center" ? 0 : -12, duration: 0.8 }, 0.15);
      if (introEl) tl.from(introEl, { opacity: 0, y: 24, duration: 1.1 }, 0.35);

      if (titleEl) {
        split = splitHeading(titleEl, (targets) =>
          gsap.from(targets, {
            yPercent: targets[0] === titleEl ? 0 : 115, y: targets[0] === titleEl ? 40 : 0,
            opacity: targets[0] === titleEl ? 0 : 1,
            rotate: targets[0] === titleEl ? 0 : 1.5, transformOrigin: "0% 100%", stagger: 0.09, duration: 1.2, ease: "expo.out",
            scrollTrigger: st,
          }));
      }
      };
      const lazy = ScrollTrigger.create({ trigger: root, start: "top bottom+=400", once: true, onEnter: setup });
      return () => { lazy.kill(); tl?.scrollTrigger?.kill(); split?.revert(); };
    });
    return () => mm.revert();
  }, { scope: ref });

  const cls = ["sh", align === "center" && "sh--center", dark && "sh--dark"].filter(Boolean).join(" ");
  const titleCls = ["sh__title", size === "hero" && "sh__title--hero", size === "h1" && "sh__title--h1", hiddenCls].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={cls} style={{ maxWidth, ...style }}>
      {eyebrow && (
        <div className={hiddenCls}>
          <Eyebrow align={align}>{eyebrow}</Eyebrow>
        </div>
      )}
      <Tag className={titleCls}>
        {title}
        {highlight && (
          <>
            {title ? " " : null}
            <span className="sh__hl">{highlight}</span>
          </>
        )}
      </Tag>
      {intro && <p className={`sh__intro ${hiddenCls}`}>{typeof intro === "string" ? lines(tidy(intro)) : tidyNode(intro)}</p>}
    </div>
  );
}
