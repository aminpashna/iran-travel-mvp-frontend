import type { ItineraryResponse } from "../types/api";

type Props = {
  itinerary: ItineraryResponse | null | undefined;
};

export default function ItineraryView({ itinerary }: Props) {
  if (!itinerary?.days?.length) return null;

  return (
    <section style={panelStyle}>
      <div style={eyebrow}>Itinerary</div>
      <h2 style={{ marginTop: 12 }}>Day-by-day plan</h2>

      <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
        {itinerary.days.map((day) => (
          <article key={day.day} style={cardStyle}>
            <div style={topRow}>
              <div style={dayBadge}>Day {day.day}</div>
              <h3 style={{ margin: 0 }}>{day.title}</h3>
            </div>

            <div style={section}>
              <div style={label}>Morning</div>
              <div>{day.morning}</div>
            </div>

            <div style={section}>
              <div style={label}>Afternoon</div>
              <div>{day.afternoon}</div>
            </div>

            <div style={section}>
              <div style={label}>Evening</div>
              <div>{day.evening}</div>
            </div>

            {day.notes?.length ? (
              <div style={{ marginTop: 14 }}>
                <div style={label}>Notes</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                  {day.notes.map((note, index) => (
                    <span key={`${note}-${index}`} style={chip}>
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

const panelStyle: React.CSSProperties = {
  padding: "20px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const eyebrow: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: "999px",
  background: "rgba(6, 182, 212, 0.18)",
  fontSize: "12px",
};

const cardStyle: React.CSSProperties = {
  padding: "16px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.035)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const topRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
};

const dayBadge: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: "999px",
  background: "rgba(6, 182, 212, 0.18)",
  fontWeight: 700,
};

const section: React.CSSProperties = {
  marginTop: "14px",
};

const label: React.CSSProperties = {
  marginBottom: "6px",
  fontSize: "13px",
  opacity: 0.75,
};

const chip: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  fontSize: "12px",
};