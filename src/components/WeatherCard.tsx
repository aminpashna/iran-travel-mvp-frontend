import type { WeatherResponse } from "../types/api";

type Props = {
  weather: WeatherResponse | null | undefined;
};

function riskColor(level?: string) {
  if (level === "low") return "#22c55e";
  if (level === "medium") return "#f59e0b";
  if (level === "high") return "#ef4444";
  return "#94a3b8";
}

export default function WeatherCard({ weather }: Props) {
  if (!weather) {
    return (
      <section style={panelStyle}>
        <div style={eyebrow}>Weather</div>
        <h2 style={{ marginTop: 12 }}>Weather unavailable</h2>
        <p style={mutedText}>Weather data was not returned for this trip.</p>
      </section>
    );
  }

  return (
    <section style={panelStyle}>
      <div style={eyebrow}>Weather</div>
      <h2 style={{ marginTop: 12 }}>Travel weather</h2>

      <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div
          style={{
            ...pill,
            background: `${riskColor(weather.risk_level)}22`,
            borderColor: `${riskColor(weather.risk_level)}66`,
          }}
        >
          Risk: {weather.risk_level}
        </div>

        <div style={pill}>Score: {weather.risk_score}</div>
        <div style={pill}>Date: {weather.travel_date}</div>
      </div>

      <p style={{ marginTop: 18, lineHeight: 1.7 }}>{weather.summary_fa}</p>

      {weather.signals?.length ? (
        <div style={{ marginTop: 16 }}>
          <h3 style={{ marginBottom: 10 }}>Signals</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {weather.signals.map((signal) => (
              <span key={signal} style={pill}>
                {signal}
              </span>
            ))}
          </div>
        </div>
      ) : null}
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
  background: "rgba(14, 165, 233, 0.18)",
  fontSize: "12px",
};

const mutedText: React.CSSProperties = {
  opacity: 0.75,
};

const pill: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
};