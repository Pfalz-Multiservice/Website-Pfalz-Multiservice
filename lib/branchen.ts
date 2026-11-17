import { tidyDeep } from "./typo";
import { IMG, type Faq } from "./data";

/**
 * Zielgruppenseiten unter /webdesign/leistungen/<slug> (bis 17.11.2026 /webdesign/branchen/handwerk und …/firmenkunden): eine für Handwerker (Kunden sind Privatleute),
 * eine für Dienstleister mit Firmenkunden. Bewusst nur zwei Seiten: Nach „Website für Handwerker“
 * wird gesucht, nach einzelnen Gewerken („Webdesign Dachdecker“) praktisch nicht, und viele fast
 * gleiche Seiten schaden bei Google. Die Gewerke stehen deshalb als Abschnitt auf der jeweiligen Seite.
 * Zahlen aus eigener Recherche (November 2026): Suchzahlen als Schätzung aus Google-Suchdaten,
 * Website-Stand aus einer Stichprobe von Google-Maps-Einträgen im Umkreis von rund 20 km.
 * Titelbilder (branche-handwerk.jpg, branche-gebaeudereinigung.jpg): Pexels, freie Pexels-Lizenz,
 * vom Inhaber am 17.11.2026 ausgewählt; nur leicht abgedunkelt und golden getönt, Motiv unverändert.
 */
export type Branche = {
  slug: string;
  /** Wie die Zielgruppe in Überschriften und im Seitentitel heißt, z. B. „Handwerker“ */
  name: string;
  /** Überschrift der Kachel auf /webdesign */
  tile: string;
  /** Kurztext für die Kachel auf /webdesign */
  short: string;
  image: string;
  /** Meta-Beschreibung (max. ca. 155 Zeichen) */
  description: string;
  text: [string, string];
  /** Zwei Zahlen aus der Recherche: Wert und Erklärung */
  facts: [value: string, label: string][];
  points: { title: string; text: string }[];
  /** Überschrift und Karten des Abschnitts mit den einzelnen Gewerken bzw. Bereichen */
  gewerkeTitle: [title: string, highlight: string];
  gewerke: { name: string; text: string }[];
  /** Startwert im Rechner: was ein Auftrag dem Betrieb im Schnitt bringt (Euro, muss eine Stufe aus dem Rechner sein) */
  auftragswert: number;
  faq: Faq[];
};

export const BRANCHEN_STAND = "November 2026";

const PRICE_ANSWER =
  "Sie zahlen einen einmaligen Festpreis: Start (OnePager, bis 5 Abschnitte) kostet 199 €, Business (OnePager oder bis 8 Seiten) 299 €. Größere Projekte bieten wir nach Angebot an. Als Kleinunternehmer nach § 19 UStG berechnen wir keine Umsatzsteuer, die Preise sind Endpreise.";
const NO_PROMISE =
  "Nein. Eine bestimmte Zahl an Anfragen oder eine bestimmte Platzierung bei Google kann niemand seriös versprechen. Wir zählen Besucher und Anfragen ohne Cookies und zeigen sie Ihnen: ab Wartung Pro in Ihrem Statistik-Dashboard, bei Wartung Premium zusätzlich als monatliche Auswertung.";

export const BRANCHEN: Branche[] = tidyDeep([
  {
    slug: "handwerker",
    name: "Handwerker",
    tile: "Handwerker",
    short: "Fensterbau, Dachsanierung, Badsanierung, Terrassenüberdachung, Gartenbau: Betriebe, bei denen ein einzelner Auftrag viel wert ist.",
    image: IMG + "branche-handwerk.jpg",
    description: "Website für Handwerker: Webdesign zum Festpreis ab 199 € für Fensterbau, Dach, Bad und Garten. Mit Anfrageformular, persönlich betreut aus Worms.",
    text: [
      "Neue Fenster, ein saniertes Dach, ein neues Bad oder eine Terrassenüberdachung: Solche Aufträge sind groß, und Ihre Kunden entscheiden nicht spontan. Sie informieren sich gründlich, vergleichen zwei, drei Betriebe und fragen dort an, wo sie Vertrauen fassen.",
      "Genau dafür bauen wir Ihre Website: Sie zeigt Ihre fertigen Arbeiten, erklärt Ihre Leistungen klar und sortiert Anfragen vor. Schon ein zusätzlicher Auftrag ist bei Ihnen mehr wert als die ganze Website.",
    ],
    facts: [
      ["rund 4.600", "Suchen im Monat nach Dachdeckern, Fensterbau, Sanitär und Bad, Terrassenüberdachungen und Gartenbau in Mannheim, Worms, Ludwigshafen und Frankenthal"],
      ["36 von 94", "Betrieben in unserer Stichprobe ohne eigene Website (Dach, Fenster, Sanitär und Heizung, Garten- und Landschaftsbau)"],
    ],
    points: [
      { title: "Ihre Arbeiten als Beweis", text: "Projektseiten mit Fotos, auf Wunsch als Vorher-Nachher-Vergleich." },
      { title: "Anfrage mit Vorauswahl", text: "Art der Arbeit, Umfang, Ort und Zeitraum. Sie sehen sofort, ob der Auftrag passt." },
      { title: "Vertrauen vor dem ersten Anruf", text: "Bewertungen, Meisterbetrieb, Ansprechpartner und Einsatzgebiet an einer Stelle." },
      { title: "Die richtigen Aufträge", text: "Wer gut ausgelastet ist, bekommt weniger unpassende Anrufe und mehr von den Aufträgen, die sich lohnen." },
    ],
    gewerkeTitle: ["Für Ihr", "Gewerk"],
    gewerke: [
      { name: "Dachdecker", text: "Fotos echter Dächer, eine Anfrage nach Steildach oder Flachdach, Reparatur oder Sanierung, und ein Knopf für den schnellen Anruf bei Sturmschaden. In unserer Stichprobe hatten 5 von 14 Dachdeckern keine eigene Website." },
      { name: "Fensterbau", text: "Fenster, Haustüren und Rollläden klar getrennt. Die Anfrage fragt Anzahl, Material und Altbau oder Neubau ab, damit Sie ohne lange Rückfragen anbieten können. 6 von 20 Fensterbauern hatten keine eigene Website." },
      { name: "Bad und Heizung", text: "Eine Galerie Ihrer fertigen Bäder, der Kundendienst ganz oben und eine eigene Seite für Bewerber. 8 von 30 Sanitär- und Heizungsbetrieben hatten keine eigene Website." },
      { name: "Terrassenüberdachung", text: "Große Bilder fertiger Überdachungen und Wintergärten, dazu eine Anfrage nach Maßen, Material und Zeitraum." },
      { name: "Garten- und Landschaftsbau", text: "Bilder verkaufen: eine Projektgalerie für Gärten, Terrassen und Wege, dazu ein Abschnitt für die laufende Pflege von Wohnanlagen. 17 von 30 Betrieben hatten keine eigene Website." },
    ],
    auftragswert: 2500,
    faq: [
      ["Was kostet eine Website für Handwerker?", PRICE_ANSWER],
      ["Für welche Gewerke bauen Sie Websites?", "Unter anderem für Fensterbauer, Dachdecker, Bad- und Heizungsbetriebe, Anbieter von Terrassenüberdachungen sowie Garten- und Landschaftsbau. Ihr Gewerk ist nicht dabei? Fragen Sie einfach an, wir gestalten jede Website einzeln."],
      ["Ich habe genug Aufträge. Brauche ich trotzdem eine neue Website?", "Dann hilft die Seite, die passenden Aufträge zu bekommen: Das Anfrageformular fragt Art und Umfang ab, kleine oder weit entfernte Aufträge erkennen Sie sofort. Dazu sehen sich Bewerber Ihre Website an, bevor sie sich melden."],
      ["Garantieren Sie mehr Anfragen?", NO_PROMISE],
      ["Was brauchen Sie von mir?", "Fotos Ihrer Arbeiten, eine Liste Ihrer Leistungen und Ihr Einsatzgebiet. Die Texte schreiben wir, Sie geben sie frei. Am einfachsten geht es über das Website-Briefing."],
    ],
  },
  {
    slug: "unternehmen",
    name: "Dienstleister mit Firmenkunden",
    tile: "Unternehmen",
    short: "Gebäudereinigung, Hausmeisterdienste, Industrieservice: Betriebe, die Firmen und Hausverwaltungen als Kunden gewinnen.",
    image: IMG + "branche-gebaeudereinigung.jpg",
    description: "Website für Dienstleister mit Firmenkunden: Gebäudereinigung, Hausmeisterdienste, Industrieservice. Individuell zum Festpreis ab 199 €, betreut aus Worms.",
    text: [
      "Ihre Kunden sind Firmen, Praxen, Hausverwaltungen oder Industriebetriebe. Dort wird ein Auftrag selten spontan vergeben: Man vergleicht, fragt nach und arbeitet danach oft über Jahre zusammen. Ein einziger neuer Kunde ist deshalb viel wert.",
      "Ihre Website muss vor allem Vertrauen schaffen und die Angebotsanfrage leicht machen: klare Leistungen, feste Ansprechpartner, Referenzen und ein Formular, das die wichtigen Angaben gleich mit abfragt.",
    ],
    facts: [
      ["rund 1.340", "Suchen im Monat nach Gebäude- und Büroreinigung in Mannheim, Ludwigshafen und Worms"],
      ["11 von 30", "Reinigungsbetrieben in unserer Stichprobe ohne eigene Website"],
    ],
    points: [
      { title: "Leistungen klar beschrieben", text: "Was Sie für welche Art von Objekt oder Betrieb übernehmen, steht auf einen Blick da." },
      { title: "Angebotsanfrage mit Vorauswahl", text: "Art des Objekts, Umfang, Häufigkeit und Ort. Sie können schneller ein Angebot schreiben." },
      { title: "Vertrauen für Firmenkunden", text: "Ansprechpartner, Versicherung, Nachweise, Referenzen und Bewertungen an einer Stelle." },
      { title: "Seite für Bewerber", text: "Offene Stellen und ein kurzer Weg zur Bewerbung, auch am Handy." },
    ],
    gewerkeTitle: ["Für Ihren", "Bereich"],
    gewerke: [
      { name: "Gebäudereinigung", text: "Leistungen je Objekt: Büro, Praxis, Treppenhaus, Glas und Sonderreinigung. Die Angebotsanfrage fragt Fläche und Häufigkeit ab. In unserer Stichprobe hatten 11 von 30 Reinigungsbetrieben keine eigene Website." },
      { name: "Hausmeister- und Objektdienste", text: "Was Sie rund ums Gebäude übernehmen, für welche Objekte und in welchem Gebiet, dazu feste Ansprechpartner für Hausverwaltungen." },
      { name: "Service für Industrie und Gewerbe", text: "Leistungen, Nachweise und Referenzen auf einen Blick, damit Einkäufer und Betriebsleiter schnell prüfen können, ob Sie passen." },
    ],
    auftragswert: 1500,
    faq: [
      ["Was kostet eine Website für einen Dienstleister mit Firmenkunden?", PRICE_ANSWER],
      ["Für welche Betriebe bauen Sie Websites?", "Unter anderem für Gebäudereinigung, Hausmeister- und Objektdienste sowie Dienstleister für Industrie und Gewerbe. Ihr Bereich ist nicht dabei? Fragen Sie einfach an, wir gestalten jede Website einzeln."],
      ["Unsere Aufträge kommen über Empfehlungen und Ausschreibungen. Brauchen wir eine Website?", "Auch wer Sie empfohlen bekommt oder Ihr Angebot prüft, sieht sich vorher Ihre Website an. Sie entscheidet mit, ob daraus eine Anfrage oder ein Auftrag wird."],
      ["Garantieren Sie mehr Anfragen?", NO_PROMISE],
    ],
  },
]);

/** Weitere Branchen ohne eigene Seite: zeigen, dass die Liste nicht abschließend ist */

export const brancheHref = (slug: string) => `/webdesign/leistungen/${slug}`;
