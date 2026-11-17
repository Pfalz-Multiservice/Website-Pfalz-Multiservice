import { lines, tidy } from "@/lib/typo";
import type { WebPackage } from "@/lib/data";
import { Icon } from "../Icon";

/**
 * Paketkarte. Bei `yearly` steht vorne der rechnerische Monatspreis,
 * darunter der Jahresbetrag – so wie man es von Abo-Preisen kennt.
 */
export function PackageCard({ p, yearly = false }: { p: WebPackage; yearly?: boolean }) {
  const jahr = yearly && !!p.priceYear;
  const price = jahr ? p.priceYearMonthly! : p.price;
  const unit = jahr ? "/ Monat" : p.unit;

  return (
    <div className={`pk ${p.badge ? "pk--hi" : ""} ${p.tagline ? "pk--tag" : ""}`}>
      {p.badge && <span className="pk__badge">{p.badge}</span>}
      <h3 className="pk__name">{p.name}</h3>
      {p.tagline && <p className="pk__tag">{p.tagline}</p>}
      <p className={`pk__price ${/\d/.test(price) ? "" : "pk__price--req"}`}>
        {p.priceYear ? (
          // Wartungspakete: feste Höhe, damit beim Umschalten nichts darunter verrutscht
          <>
            <span className={`pk__regular ${jahr ? "" : "is-off"}`}>Statt <s>{p.price}</s> im Monat</span>
            <span className="pk__amount">{price}{unit && <span className="pk__unit"> {unit}</span>}</span>
            <span className={`pk__billed ${jahr ? "" : "is-off"}`}><b>{p.priceYear}</b> pro Jahr, einmal jährlich abgerechnet</span>
          </>
        ) : (
          <>
            {p.regular && <span className="pk__regular"><span className="pk__offer">Angebot</span> Normalpreis <s>{p.regular}</s></span>}
            <span className="pk__amount">{price}{unit && <span className="pk__unit"> {unit}</span>}</span>
          </>
        )}
      </p>
      <p className={`pk__note ${p.note.endsWith(":") ? "pk__note--lead" : ""}`}>{p.note}</p>
      <ul className="pk__list">
        {p.items.map((it) => (
          <li key={it} className={p.plus ? "pk__plus" : undefined}><Icon name={p.plus ? "circle-plus" : "check"} size={16} />
            <span>{lines(tidy(it))}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
