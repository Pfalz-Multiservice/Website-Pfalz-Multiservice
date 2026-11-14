"use client";
import { UPDATED, UPDATED_ISO } from "@/lib/site";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { CONTACT, SERVICES, serviceHref } from "@/lib/data";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const root = ref.current!;
      gsap.set(root.querySelectorAll(".pm-reveal"), { visibility: "visible" });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 90%", once: true } });
      tl.to(root.querySelector(".footer__line"), { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, 0)
        .from(root.querySelectorAll(".footer__col"), { y: 40, opacity: 0, stagger: 0.12, duration: 1.1 }, 0.2)
        .from(root.querySelectorAll(".footer__contact > *"), { x: -16, opacity: 0, stagger: 0.08, duration: 0.8 }, 0.45);
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(ref.current!.querySelector(".footer__line"), { scaleX: 1 });
    });
    return () => mm.revert();
  }, { scope: ref });

  const toTop = () => {
    const l = getLenis();
    if (l) l.scrollTo(0, { duration: 1.6 }); else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="footer">
      <div className="footer__line" aria-hidden="true" />
      <div className="footer__grid">
        <div className="footer__col footer__brand pm-reveal">
          <Logo height={120} />
          <p className="footer__text"><br /><br />Pfalz Multiservice bündelt Dienstleistungen für Unternehmen und Privatkunden in der Region Worms.</p>
        </div>
        <div className="footer__col pm-reveal">
          <h2 className="footer__h">Kontakt</h2>
          <div className="footer__contact">
            <span className="footer__gold"><Icon name="map-pin" size={16} />{CONTACT.city}</span>
            <a className="footer__gold" href={CONTACT.phoneHref} data-cursor><Icon name="phone" size={16} />{CONTACT.phone}</a>
            <a className="footer__gold" href={`mailto:${CONTACT.email}`} data-cursor><Icon name="mail" size={16} />{CONTACT.email}</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom-wrap">
        <div className="footer__bottom">
          <div className="stack" style={{ gap: 4 }}>
            <span>Copyright © 2021 - 2026, Pfalz Multiservice. Alle Rechte vorbehalten</span>
            <nav className="footer__legal" aria-label="Leistungen">
              {SERVICES.map((s, i) => (
                <span key={s.id} style={{ display: "inline-flex", gap: 4 }}>
                  {i > 0 && <span>|</span>}
                  <Link href={serviceHref(s)}>{s.title}</Link>
                </span>
              ))}
            </nav>
            <span className="footer__legal">
              <Link href="/impressum">Impressum</Link>
              <span>|</span>
              <Link href="/datenschutz">Datenschutz</Link>
              <span>|</span>
              <Link href="/webdesign-worms">Webdesign Worms</Link>
              <span>|</span>
              <Link href="/ratgeber">Ratgeber</Link>
              <span>|</span>
              <Link href="/partner">Partner</Link>
              <span>|</span>
              <Link href="/inhalte-melden">Inhalte melden</Link>
            </span>
            <span className="footer__legal">Zuletzt aktualisiert: <time dateTime={UPDATED_ISO}>{UPDATED}</time></span>
          </div>
          <button className="to-top" onClick={toTop} aria-label="Nach oben scrollen" data-cursor>
            <Icon name="arrow-up" size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
