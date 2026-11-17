import { STATS } from "@/lib/data";

/** Zahlenleiste unter dem Hero: vier harte Fakten statt Floskeln */
export function Stats() {
  return (
    <div className="stats">
      <div className="container">
        <div className="stats__grid pm-reveal" data-reveal="stagger">
          {STATS.map((s) => (
            <div key={s.label} className="stats__item">
              <span className="stats__value">{s.value}</span>
              <span className="stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
