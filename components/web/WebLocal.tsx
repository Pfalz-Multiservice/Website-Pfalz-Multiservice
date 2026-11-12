import Link from "next/link";
import { CONTACT } from "@/lib/data";
import { SITE_NAME } from "@/lib/site";
import { tidy } from "@/lib/typo";
import { SectionHeading } from "../SectionHeading";
import { CheckList } from "../CheckList";
import { Icon } from "../Icon";

/** Stadtteile und Nachbarorte, die im Text und im Schema (areaServed) genannt werden */
export const WORMS_DISTRICTS = ["Horchheim", "Pfeddersheim", "Herrnsheim", "Hochheim", "Rheindürkheim"];
export const WORMS_NEARBY = ["Osthofen", "Alzey"];

/**
 * Lokaler Abschnitt der Webdesign-Seite: Worms im Fließtext, dazu Name, Ort und Telefon
 * exakt wie im Google-Unternehmensprofil (Einzugsgebiet, daher ohne Straße).
 */
export function WebLocal({ alt = true }: { alt?: boolean }) {
  const points = [
    { title: "Ansprechpartner in Worms", text: "Sie sprechen direkt mit uns, nicht mit einer Hotline oder einer Agentur am anderen Ende des Landes." },
    { title: "Für Kunden aus der Region", text: "Texte und Seitenaufbau so, dass Ihre Kunden in Worms und Umgebung Sie bei Google finden." },
    { title: "Festpreis ab 199 €", text: "Einmalig, ohne Abo. Sie kennen den Preis, bevor wir beginnen." },
  ];
  return (
    <section className={`section${alt ? " section--alt" : ""}`} id="worms">
      <div className="container split web-local">
        <div>
          <SectionHeading eyebrow="Webdesign aus Worms" title="Ihr Webdesigner" highlight="in Worms" />
          <p className="web-local__text pm-reveal" data-reveal="up">
            {tidy(`${SITE_NAME} ist in Worms zu Hause. Wir gestalten Websites für Betriebe, Selbstständige und Vereine aus der Innenstadt und allen Stadtteilen, von ${WORMS_DISTRICTS.slice(0, -1).join(", ")} bis ${WORMS_DISTRICTS.at(-1)}.`)}
          </p>
          <p className="web-local__text pm-reveal" data-reveal="up">
            {tidy(`Auch aus ${WORMS_NEARBY.join(" und ")}, aus ganz Rheinhessen, der Pfalz und aus Mannheim kommen Kunden zu uns. Absprachen laufen per Telefon, WhatsApp oder E-Mail, Termine nach Vereinbarung.`)}
          </p>
          <div className="pm-reveal" data-reveal="up"><CheckList items={points} /></div>
        </div>
        <address className="web-local__card pm-reveal" data-reveal="up">
          <span className="web-local__name">{SITE_NAME}</span>
          <span className="web-local__row"><Icon name="map-pin" size={18} />{CONTACT.city}</span>
          <a className="web-local__row" href={CONTACT.phoneHref}><Icon name="phone" size={18} />{CONTACT.phone}</a>
          <a className="web-local__row" href={CONTACT.whatsapp}><Icon name="message-circle" size={18} />WhatsApp schreiben</a>
          <a className="web-local__row" href={`mailto:${CONTACT.email}`}><Icon name="mail" size={18} />{CONTACT.email}</a>
          <span className="web-local__note">Termine nach Vereinbarung</span>
        </address>
      </div>
    </section>
  );
}

/** Hinweis auf /webdesign: führt Besucher (und Google) zur eigenen Worms-Seite */
export function WormsTeaser() {
  return (
    <section className="section section--tight">
      <div className="container">
        <Link href="/webdesign-worms" className="bstrip web-local__teaser pm-reveal" data-reveal="up" data-cursor>
          <span className="bstrip__icon"><Icon name="map-pin" size={24} /></span>
          <span className="bstrip__txt">
            <b>Webdesign in Worms</b>
            <span>{tidy("Sie kommen aus Worms oder der Umgebung? Ihr Ansprechpartner in Worms, Stadtteile und Preise auf einen Blick.")}</span>
          </span>
          <Icon name="arrow-right" size={20} />
        </Link>
      </div>
    </section>
  );
}
