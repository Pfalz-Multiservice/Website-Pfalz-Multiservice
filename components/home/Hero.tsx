"use client";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, introDelay, splitHeading } from "@/lib/gsap";
import { CONTACT, IMG } from "@/lib/data";
import { BgImage } from "../BgImage";
import { SectionHeading } from "../SectionHeading";
import { GoogleBadge } from "../GoogleBadge";
import { Button } from "../Button";
import { OfferTicket } from "./OfferTicket";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = ref.current!;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const title = root.querySelector(".sh__title")!;
      gsap.set(root.querySelectorAll(".pm-intro"), { visibility: "visible" });

      const tl = gsap.timeline({ delay: introDelay() });
      tl.from(root.querySelector(".hero__bg-img"), { scale: 1.28, duration: 2.6, ease: "expo.out" }, 0)
        .from(root.querySelector(".hero__scrim"), { opacity: 0.35, duration: 2 }, 0)
        .from(root.querySelectorAll(".eyebrow__rule"), { scaleX: 0, duration: 1, ease: "power3.inOut" }, 0.1)
        .from(root.querySelector(".eyebrow__text"), { opacity: 0, x: -14, duration: 0.9 }, 0.3);

      const split = splitHeading(title);
      const whole = split.targets[0] === title;
      tl.from(split.targets, whole ? { y: 50, opacity: 0, duration: 1.4 } : { yPercent: 118, rotate: 2, transformOrigin: "0% 100%", duration: 1.4, stagger: 0.12, ease: "expo.out" }, 0.25)
        .to(title.querySelectorAll(".sh__hl"), { backgroundSize: "100% .07em", duration: 0.9, stagger: 0.25, ease: "power3.inOut" }, 1.05)
        .from(root.querySelectorAll(".hero__ctas > *"), { y: 30, opacity: 0, duration: 1.1, stagger: 0.1 }, 0.95)
        .from(root.querySelector(".hero__scroll"), { opacity: 0, y: -10, duration: 1 }, 1.4);

      // Scroll-Hinweis: laufender Goldpunkt
      gsap.fromTo(root.querySelector(".hero__scroll-dot"), { yPercent: -100 }, { yPercent: 320, duration: 1.6, ease: "power2.inOut", repeat: -1, repeatDelay: 0.3 });

      // Parallax beim Herausscrollen
      gsap.to(root.querySelector(".hero__bg"), {
        yPercent: 14, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(root.querySelector(".hero__inner"), {
        yPercent: -18, opacity: 0.15, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });

      // Goldener Lichtschein folgt dem Cursor
      const glow = root.querySelector<HTMLElement>(".hero__glow")!;
      gsap.set(glow, { "--gx": "70%", "--gy": "40%" });
      const move = (e: PointerEvent) => {
        const r = root.getBoundingClientRect();
        gsap.to(glow, {
          "--gx": `${((e.clientX - r.left) / r.width) * 100}%`,
          "--gy": `${((e.clientY - r.top) / r.height) * 100}%`,
          duration: 1.2, ease: "power3.out", overwrite: "auto",
        });
      };
      root.addEventListener("pointermove", move);
      return () => { root.removeEventListener("pointermove", move); split.revert(); };
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="hero" id="start">
      <div className="hero__bg">
        <BgImage className="hero__bg-img" src={IMG + "transporter-halle.png"} eager />
      </div>
      <div className="hero__scrim" />
      <div className="hero__glow" />
      <div className="container hero__content">
        <div className="hero__inner">
          <GoogleBadge />
          <SectionHeading
            dark level={1} size="hero" motion="intro" maxWidth={1300}
            eyebrow="Pfalz Multiservice · Worms"
            title={<span className="sh__line">Viele Leistungen.</span>}
            highlight={"Ein\u00A0Ansprech\u00ADpartner."}
          />
          <div className="hero__ctas pm-intro">
            <Button variant="accent" size="lg" href="/kontakt">Unverbindlich anfragen</Button>
            <Button variant="outline-light" size="lg" iconLeft="message-circle" href={CONTACT.whatsapp}>Per WhatsApp schreiben</Button>
          </div>
        </div>
        <OfferTicket />
      </div>
      <a href="#leistungen" className="hero__scroll pm-intro" aria-label="Zu den Leistungen scrollen">
        <span className="hero__scroll-track"><span className="hero__scroll-dot" /></span>
      </a>
    </section>
  );
}
