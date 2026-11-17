import Link from "next/link";
import { BRANCHEN, BRANCHEN_AUCH, BRANCHEN_STAND, brancheHref, type Branche } from "@/lib/branchen";
import { tidy, tidyNode } from "@/lib/typo";
import { SectionHeading } from "../SectionHeading";
import { CheckList } from "../CheckList";
import { Icon } from "../Icon";

/** Drei Stufen nach Ergebnis benannt. Preise und Inhalte stehen in der Preisliste (Website-Pakete, Wartung Pro, Wartung Premium). */
const STUFEN: { step: string; name: string; text: string; pack: string; price: string; unit: string; href: string }[] = [
  { step: "01", name: "Sichtbar", text: "Ihr Betrieb wird gefunden und zeigt auf einen Blick, was er kann und wie man ihn erreicht.",
    pack: "Website zum Festpreis", price: "ab 199 €", unit: "einmalig", href: "#pakete" },
  { step: "02", name: "Messbar", text: "Ihr Statistik-Dashboard zeigt Besucher und Anfragen, ohne Cookies. Sie sehen, was die Website bringt.",
    pack: "Wartung Pro", price: "59 €", unit: "im Monat", href: "#wartung" },
  { step: "03", name: "Mehr Anfragen", text: "Wir pflegen Ihr Google-Unternehmensprofil, sortieren Anfragen vor und verbessern die Seite jeden Monat.",
    pack: "Wartung Premium", price: "99 €", unit: "im Monat", href: "#wartung" },
];

export function WebStufen({ alt = true }: { alt?: boolean }) {
  return tidyNode(
    <section className={`section${alt ? " section--alt" : ""}`} id="stufen">
      <div className="container">
        <SectionHeading eyebrow="Ihr Weg" title="Drei Stufen zu" highlight="mehr Anfragen"
          intro={"Sie entscheiden, wie weit Sie gehen. Jede Stufe baut auf der vorigen auf,\nStufe zwei und drei sind monatlich kündbar."} style={{ marginBottom: 44 }} />
        <ol className="stufen pm-reveal" data-reveal="stagger">
          {STUFEN.map((s) => (
            <li key={s.step} className="stufe">
              <span className="stufe__step" aria-hidden="true">{s.step}</span>
              <h3 className="stufe__name">{s.name}</h3>
              <p className="stufe__text">{s.text}</p>
              <p className="stufe__price"><b>{s.price}</b> {s.unit}</p>
              <Link href={s.href} className="stufe__link" data-cursor>{s.pack}<Icon name="arrow-right" size={16} /></Link>
            </li>
          ))}
        </ol>
        <p className="stufen__note pm-reveal" data-reveal="up">
          <Icon name="info" size={18} />
          <span><b>Ehrlich gesagt:</b> Eine bestimmte Zahl an Anfragen kann niemand seriös versprechen. Wir zählen sie und zeigen sie Ihnen jeden Monat.</span>
        </p>
      </div>
    </section>
  );
}

/** Branchenübersicht: Kacheln für die Branchen mit eigener Seite, weitere Branchen als Zeile, dazu „Ihre Branche ist nicht dabei?“ */
export function WebBranchen({ current, alt = false }: { current?: string; alt?: boolean }) {
  const list = BRANCHEN.filter((b) => b.slug !== current);
  return tidyNode(
    <section className={`section${alt ? " section--alt" : ""}`} id="branchen">
      <div className="container">
        <SectionHeading eyebrow="Branchen" title="Für Handwerk und" highlight="Dienstleister"
          intro={current ? "Wir bauen Websites für viele Branchen. Jede bekommt ein eigenes Design." : "Ob Ihre Kunden Privatleute oder Unternehmen sind:\nJede Website gestalten wir einzeln, keine kommt aus dem Baukasten."} style={{ marginBottom: 40 }} />
        <ul className="branchen pm-reveal" data-reveal="stagger">
          {list.map((b) => (
            <li key={b.slug}>
              <Link href={brancheHref(b.slug)} className="branche" data-cursor>
                <span className="branche__name">{b.tile}</span>
                <span className="branche__text">{b.short}</span>
                <span className="branche__more">Mehr erfahren<Icon name="arrow-right" size={16} /></span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/kontakt?leistung=web" className="branche branche--open" data-cursor>
              <span className="branche__name">Ihre Branche ist nicht dabei?</span>
              <span className="branche__text">Kein Problem. Erzählen Sie uns kurz von Ihrem Betrieb, wir melden uns mit einem Vorschlag.</span>
              <span className="branche__more">Unverbindlich anfragen<Icon name="arrow-right" size={16} /></span>
            </Link>
          </li>
        </ul>
        <p className="branchen__auch pm-reveal" data-reveal="up"><b>Auch für:</b> {BRANCHEN_AUCH.join(", ")} und viele mehr.</p>
      </div>
    </section>
  );
}

/** Branchenseite: Text und Leistungen links, Zahlen aus der eigenen Recherche rechts */
export function BrancheIntro({ b }: { b: Branche }) {
  return (
    <section className="section" id="branche">
      <div className="container split web-local">
        <div>
          <SectionHeading eyebrow={`Für ${b.name}`} title="Was Ihre Website" highlight="leisten muss" />
          {b.text.map((t) => <p key={t} className="web-local__text pm-reveal" data-reveal="up">{t}</p>)}
          <div className="pm-reveal" data-reveal="up"><CheckList items={b.points} /></div>
        </div>
        <aside className="web-local__card bfacts pm-reveal" data-reveal="up" aria-label="Zahlen aus unserer Recherche">
          <span className="bfacts__label">Aus unserer Recherche</span>
          {b.facts.map(([value, label]) => (
            <p key={label} className="bfacts__item"><b>{value}</b><span>{tidy(label)}</span></p>
          ))}
          <span className="web-local__note">{tidy(`Stand ${BRANCHEN_STAND}. Suchzahlen sind eine Schätzung aus Google-Suchdaten. Stichprobe: Einträge bei Google Maps im Umkreis von rund 20 km um Worms, Mannheim und Ludwigshafen. Als „ohne eigene Website“ zählen auch Betriebe, die nur auf ein Branchenverzeichnis verlinken.`)}</span>
        </aside>
      </div>
    </section>
  );
}

/** Rechenbeispiel: gleiche Besucherzahl, doppelter Anteil an Anfragen. Ausdrücklich keine Zusage. */
export function BrancheRechnung() {
  const rows: [string, string, string][] = [
    ["Besucher im Monat", "200", "200"],
    ["Davon fragen an", "2 von 100", "4 von 100"],
    ["Anfragen im Monat", "4", "8"],
  ];
  return tidyNode(
    <section className="section" id="rechnung">
      <div className="container split rechnung">
        <div>
          <SectionHeading eyebrow="Rechenbeispiel" title="Was eine bessere Website" highlight="ausmachen kann"
            intro="Oft fehlt es nicht an Besuchern, sondern daran, dass zu wenige von ihnen anfragen. Schon ein kleiner Unterschied verdoppelt die Zahl der Anfragen." />
          <p className="web-local__text pm-reveal" data-reveal="up">Was ein zusätzlicher Auftrag wert ist, wissen Sie selbst am besten. Dem stehen 59 € oder 99 € im Monat gegenüber.</p>
        </div>
        <div className="pm-reveal" data-reveal="up">
          <table className="rechnung__table">
            <thead><tr><th scope="col"><span className="sr-only">Kennzahl</span></th><th scope="col">Heute</th><th scope="col">Danach</th></tr></thead>
            <tbody>
              {rows.map(([label, a, z], i) => (
                <tr key={label} className={i === rows.length - 1 ? "is-sum" : undefined}><th scope="row">{label}</th><td>{a}</td><td>{z}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="rechnung__note">Ein Rechenbeispiel mit angenommenen Zahlen, keine Zusage. Ihre echten Zahlen sehen Sie ab Wartung Pro in Ihrem Statistik-Dashboard.</p>
        </div>
      </div>
    </section>
  );
}

/** Verweise auf die anderen Branchenseiten */
export function BranchenLinks({ current }: { current?: string }) {
  const links = BRANCHEN.filter((b) => b.slug !== current);
  return (
    <section className="section section--tight">
      <div className="container">
        <nav className="city-links pm-reveal" data-reveal="up" aria-label="Websites für weitere Zielgruppen">
          <span className="city-links__label">Websites für weitere Zielgruppen</span>
          <ul className="city-links__list">
            {links.map((b) => <li key={b.slug}><Link href={brancheHref(b.slug)} data-cursor>{b.tile}</Link></li>)}
            <li><Link href="/webdesign#branchen" data-cursor>Alle Branchen</Link></li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

/** Gewerke bzw. Bereiche einer Zielgruppe als Karten: ersetzt eigene Unterseiten je Gewerk */
export function BrancheGewerke({ b }: { b: Branche }) {
  return tidyNode(
    <section className="section section--alt" id="gewerke">
      <div className="container">
        <SectionHeading eyebrow="Im Einzelnen" title={b.gewerkeTitle[0]} highlight={b.gewerkeTitle[1]}
          intro="Jeder Betrieb hat eigene Kunden und eigene Fragen. Darauf richten wir Aufbau und Anfrageformular aus." style={{ marginBottom: 40 }} />
        <ul className="gewerke pm-reveal" data-reveal="stagger">
          {b.gewerke.map((g) => (
            <li key={g.name} className="gewerk">
              <h3 className="gewerk__name">{g.name}</h3>
              <p className="gewerk__text">{g.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
