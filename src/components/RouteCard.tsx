import type { RouteResponse } from "../types/api";

type Props = {
  route: RouteResponse;
};

function formatIrr(value?: number | null) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US").format(value) + " IRR";
}

function formatDuration(minutes?: number | null) {
  if (!minutes) return "—";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export default function RouteCard({ route }: Props) {
  return (
    <section style={panelStyle}>
      <div style={headerRow}>
        <div>
          <div style={eyebrow}>Route</div>
          <h2 style={titleStyle}>Driving route</h2>
        </div>

        {route.navigation_url ? (
          <a
            href={route.navigation_url}
            target="_blank"
            rel="noreferrer"
            style={linkButtonStyle}
          >
            Open navigation
          </a>
        ) : null}
      </div>

      <div style={statsGrid}>
        <div style={statCard}>
          <div style={statLabel}>Distance</div>
          <div style={statValue}>{route.distance_km} km</div>
        </div>

        <div style={statCard}>
          <div style={statLabel}>Duration</div>
          <div style={statValue}>{formatDuration(route.duration_min)}</div>
        </div>

        <div style={statCard}>
          <div style={statLabel}>Fuel estimate</div>
          <div style={statValue}>{formatIrr(route.fuel_estimate_irr)}</div>
        </div>

        <div style={statCard}>
          <div style={statLabel}>Tolls</div>
          <div style={statValue}>{formatIrr(route.tolls_estimate_irr)}</div>
        </div>
      </div>

      {route.steps?.length ? (
        <div style={{ marginTop: 20 }}>
          <h3 style={sectionTitle}>Key steps</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {route.steps.slice(0, 8).map((step, index) => (
              <div key={`${step.instruction}-${index}`} style={stepRow}>
                <div style={stepIndex}>{index + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{step.instruction}</div>
                  <div style={mutedText}>
                    {step.distance_km} km · {step.duration_min} min
                  </div>
                </div>
              </div>
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

const headerRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px",
  flexWrap: "wrap",
};

const eyebrow: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: "999px",
  background: "rgba(124, 58, 237, 0.18)",
  fontSize: "12px",
};

const titleStyle: React.CSSProperties = {
  margin: "12px 0 0 0",
};

const linkButtonStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: "12px",
  background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
  color: "#fff",
  textDecoration: "none",
  fontWeight: 700,
};

const statsGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "12px",
  marginTop: "20px",
};

const statCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "14px",
};

const statLabel: React.CSSProperties = {
  fontSize: "13px",
  opacity: 0.75,
};

const statValue: React.CSSProperties = {
  marginTop: "8px",
  fontSize: "18px",
  fontWeight: 700,
};

const sectionTitle: React.CSSProperties = {
  margin: "0 0 12px 0",
};

const stepRow: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  padding: "12px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
};

const stepIndex: React.CSSProperties = {
  width: "28px",
  height: "28px",
  borderRadius: "999px",
  background: "rgba(124, 58, 237, 0.22)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  flexShrink: 0,
};

const mutedText: React.CSSProperties = {
  marginTop: "4px",
  fontSize: "13px",
  opacity: 0.75,
};