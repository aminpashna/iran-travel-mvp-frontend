import type { AISummaryResponse } from "../types/api";

type Props = {
  summary: AISummaryResponse | null | undefined;
};

export default function AISummaryCard({ summary }: Props) {
  if (!summary) return null;

  return (
    <section style={panelStyle}>
      <div style={eyebrow}>AI Summary</div>
      <h2 style={{ marginTop: 12 }}>{summary.headline}</h2>

      <p style={paragraph}>{summary.summary}</p>

      <div style={grid}>
        <div style={infoCard}>
          <div style={label}>Why this works</div>
          <div>{summary.recommendation_reason}</div>
        </div>

        <div style={infoCard}>
          <div style={label}>Weather note</div>
          <div>{summary.weather_note}</div>
        </div>

        <div style={infoCard}>
          <div style={label}>Drive tip</div>
          <div>{summary.drive_tip}</div>
        </div>

        <div style={infoCard}>
          <div style={label}>Best hotel</div>
          <div>{summary.best_hotel_name || "No specific hotel selected"}</div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <span style={confidenceBadge}>Confidence: {summary.confidence}</span>
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
  background: "rgba(168, 85, 247, 0.18)",
  fontSize: "12px",
};

const paragraph: React.CSSProperties = {
  marginTop: "16px",
  lineHeight: 1.7,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "12px",
  marginTop: "18px",
};

const infoCard: React.CSSProperties = {
  padding: "14px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const label: React.CSSProperties = {
  marginBottom: "8px",
  fontSize: "13px",
  opacity: 0.75,
};

const confidenceBadge: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(168, 85, 247, 0.18)",
  border: "1px solid rgba(168, 85, 247, 0.35)",
};