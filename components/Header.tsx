"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, introDelay } from "@/lib/gsap";
import { getLenis, scrollToHash } from "@/lib/lenis";
import { SERVICES, serviceHref } from "@/lib/data";
import { pageSections } from "@/lib/page-nav";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

/** Menüreihenfolge: nach Titellänge, längster Titel zuerst (Startseitenkacheln behalten die Reihenfolge aus SERVICES) */
const MENU_SERVICES = [...SERVICES].sort((a, b) => b.title.length - a.title.length);

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  // Handy-Menü: Liste der Leistungen ist eingeklappt
  const [mobLs, setMobLs] = useState(false);
  const ddTl = useRef<gsap.core.Timeline | null>(null);
  const mobTl = useRef<gsap.core.Timeline | null>(null);

  // Leistungsseite: Header zeigt „← Alle Leistungen“ + Abschnitte dieser Seite
  const sections = pageSections(pathname);
  const [current, setCurrent] = useState<string | null>(null);

  const active =
    pathname.startsWith("/leistungen") ? "leistungen" : pathname.startsWith("/webdesign") ? "webdesign" : pathname.startsWith("/kontakt") ? "kontakt" : null;

  // Einblenden, Hide-on-scroll, Hintergrund
  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from(el, { yPercent: -100, duration: 1.1, ease: "expo.out", delay: introDelay() - 0.15 });
    });
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const y = self.scroll();
        setSolid(y > 40);
        if (document.documentElement.classList.contains("pm-menu-open")) return;
        const hide = self.direction === 1 && y > 280;
        gsap.to(el, { yPercent: hide ? -100 : 0, duration: 0.55, ease: "power3.out", overwrite: "auto" });
      },
    });
    return () => { st.kill(); mm.revert(); };
  }, { scope: ref });

  // Dropdown-Timeline
  useGSAP(() => {
    const dd = ref.current!.querySelector(".dropdown");
    if (!dd) return;
    const links = dd.querySelectorAll(".dropdown__link");
    ddTl.current = gsap.timeline({ paused: true })
      .set(dd, { visibility: "visible" })
      .fromTo(dd, { opacity: 0, clipPath: "inset(0% 0% 100% 0%)", y: 8 }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.5, ease: "expo.out" })
      .from(links, { opacity: 0, x: -10, stagger: 0.035, duration: 0.45, ease: "power3.out" }, 0.08);
  }, { scope: ref });

  useEffect(() => {
    const tl = ddTl.current;
    if (!tl) return;
    if (ddOpen) tl.timeScale(1).play(); else tl.timeScale(1.8).reverse();
  }, [ddOpen]);

  // Mobile-Menü
  useGSAP(() => {
    const nav = document.querySelector(".mobile-nav");
    if (!nav) return;
    mobTl.current = gsap.timeline({ paused: true })
      .set(nav, { visibility: "visible" })
      .fromTo(nav, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" })
      .from(nav.querySelectorAll(".mobile-nav__link"), { yPercent: 60, opacity: 0, stagger: 0.04, duration: 0.6, ease: "expo.out" }, 0.35);
  });

  useEffect(() => {
    const tl = mobTl.current;
    const html = document.documentElement;
    if (mobile) {
      html.classList.add("pm-menu-open");
      getLenis()?.stop();
      gsap.to(ref.current, { yPercent: 0, duration: 0.3 });
      tl?.timeScale(1).play();
    } else {
      html.classList.remove("pm-menu-open");
      getLenis()?.start();
      tl?.timeScale(1.6).reverse();
    }
  }, [mobile]);

  useEffect(() => { setMobile(false); setDdOpen(false); setMobLs(false); }, [pathname]);
  useEffect(() => { if (!mobile) setMobLs(false); }, [mobile]);

  // Aktiven Abschnitt beim Scrollen markieren (letzter Abschnitt, dessen Oberkante die obere Bildschirmhälfte erreicht hat)
  useEffect(() => {
    setCurrent(null);
    if (!sections) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let hit: string | null = null;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) hit = id;
      }
      // unter dem letzten Abschnitt (CTA, Footer) bleibt nichts markiert
      const last = hit && document.getElementById(hit);
      if (last && last.getBoundingClientRect().bottom < line) hit = null;
      setCurrent(hit);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const goSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (mobile) {
      // Menü schließen und Scrollen sofort freigeben, sonst ignoriert Lenis den Sprung
      document.documentElement.classList.remove("pm-menu-open");
      getLenis()?.start();
      setMobile(false);
    }
    scrollToHash("#" + id);
    history.replaceState(null, "", "#" + id);
  };
  const goLeistungen = (e: React.MouseEvent) => {
    if (pathname === "/") { e.preventDefault(); setMobile(false); scrollToHash("#leistungen"); }
  };

  const goUeber = (e: React.MouseEvent) => {
    if (pathname === "/") { e.preventDefault(); setMobile(false); scrollToHash("#ueber"); }
  };
  const goHome = (e: React.MouseEvent) => {
    if (pathname === "/") { e.preventDefault(); setMobile(false); getLenis()?.scrollTo(0, { duration: 1.4 }); }
  };

  return (
    <>
      <header ref={ref} className={`header ${solid ? "header--solid" : "header--top"}`}>
        <div className="header__inner">
          <Link href="/" className="header__logo" onClick={goHome} aria-label="Pfalz Multiservice, Startseite" data-cursor>
            <Logo height={48} priority />
          </Link>

          <nav className={`nav ${sections ? "nav--page" : ""}`} aria-label={sections ? "Abschnitte dieser Seite" : "Hauptnavigation"}>
            <div
              className={`nav__item ${ddOpen ? "nav__item--open" : ""}`}
              onMouseEnter={() => setDdOpen(true)}
              onMouseLeave={() => setDdOpen(false)}
              onFocus={() => setDdOpen(true)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDdOpen(false); }}
            >
              {sections ? (
                <Link href="/#leistungen" className="nav__link nav__back" aria-haspopup="true" aria-expanded={ddOpen} data-cursor>
                  <Icon name="arrow-right" size={15} className="nav__back-ico" /> Alle Leistungen
                </Link>
              ) : (
                <button
                  className={`nav__link ${active === "leistungen" ? "nav__link--active" : ""}`}
                  aria-expanded={ddOpen}
                  aria-haspopup="true"
                  onClick={() => (pathname === "/" ? scrollToHash("#leistungen") : router.push("/#leistungen"))}
                  data-cursor
                >
                  Leistungen <Icon name="chevron-down" size={15} className="nav__chev" />
                </button>
              )}
              <div className="dropdown" role="menu">
                {MENU_SERVICES.filter((s) => serviceHref(s) !== pathname).map((s) => (
                  <Link key={s.id} href={serviceHref(s)} className="dropdown__link" role="menuitem" data-cursor
                    onClick={() => setDdOpen(false)}>
                    <Icon name={s.icon} size={18} />
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
            {sections ? (
              <>
                <span className="nav__sep" aria-hidden="true" />
                {sections.map((sec) => (
                  <div className="nav__item" key={sec.id}>
                    <a href={"#" + sec.id} onClick={goSection(sec.id)} data-cursor
                      className={`nav__link ${current === sec.id ? "nav__link--active" : ""}`}
                      aria-current={current === sec.id ? "location" : undefined}>{sec.label}</a>
                  </div>
                ))}
                <span className="nav__sep" aria-hidden="true" />
              </>
            ) : (
              <>
                <div className="nav__item">
                  <Link href="/#ueber" className="nav__link" onClick={goUeber} data-cursor>Über uns</Link>
                </div>
                <div className="nav__item">
                  <Link href="/webdesign" className={`nav__link shine ${active === "webdesign" ? "nav__link--active" : ""}`} data-cursor>Webdesign</Link>
                </div>
              </>
            )}
            <div className="nav__item">
              <Link href="/kontakt" className={`nav__link ${active === "kontakt" ? "nav__link--active" : ""}`} data-cursor>Kontakt</Link>
            </div>
          </nav>

          <button className="burger" aria-label={mobile ? "Menü schließen" : "Menü öffnen"} aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}>
            <Icon name={mobile ? "x" : "menu"} size={22} />
          </button>
        </div>
      </header>

      {/* Handy-Menü: zuerst die Hauptziele (bzw. die Abschnitte dieser Seite) und Kontakt, die Leistungen klein und eingeklappt darunter */}
      <div className="mobile-nav" aria-hidden={!mobile}>
        {sections ? (
          <>
            <span className="mobile-nav__label">Auf dieser Seite</span>
            {sections.map((sec) => (
              <a key={sec.id} href={"#" + sec.id} onClick={goSection(sec.id)}
                className={`mobile-nav__link ${current === sec.id ? "mobile-nav__link--active" : ""}`}>{sec.label}</a>
            ))}
          </>
        ) : (
          <>
            <Link href="/webdesign" className="mobile-nav__link shine">Webdesign</Link>
            <Link href="/#ueber" className="mobile-nav__link" onClick={goUeber}>Über uns</Link>
          </>
        )}
        <Link href="/kontakt" className="mobile-nav__link">Kontakt</Link>

        <button type="button" className="mobile-nav__toggle" aria-expanded={mobLs} aria-controls="mobile-nav-ls" onClick={() => setMobLs((v) => !v)}>
          {sections ? "Alle Leistungen" : "Leistungen"}
          <Icon name="chevron-down" size={18} className="mobile-nav__chev" />
        </button>
        <div id="mobile-nav-ls" className={`mobile-nav__ls ${mobLs ? "is-open" : ""}`} inert={!mobLs}>
          <div className="mobile-nav__ls-in">
            {MENU_SERVICES.filter((s) => serviceHref(s) !== pathname).map((s) => (
              <Link key={s.id} href={serviceHref(s)} className="mobile-nav__link mobile-nav__link--sub">
                <Icon name={s.icon} size={18} /> {s.title}
              </Link>
            ))}
            <Link href="/#leistungen" className="mobile-nav__link mobile-nav__link--sub mobile-nav__all" onClick={goLeistungen}>
              <Icon name="arrow-right" size={18} /> Alle Leistungen im Überblick
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
