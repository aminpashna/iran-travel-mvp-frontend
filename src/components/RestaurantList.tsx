import type { RestaurantResponse } from "../types/api";

type Props = {
  restaurants: RestaurantResponse[];
};

export default function RestaurantList({ restaurants }: Props) {
  return (
    <section style={panelStyle}>
      <div style={eyebrow}>Restaurants</div>
      <h2 style={{ marginTop: 12 }}>Suggested restaurants</h2>

      {!restaurants?.length ? (
        <p style={{ opacity: 0.75 }}>No restaurants were returned for this trip.</p>
      ) : (
        <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
          {restaurants.map((item) => (
            <article key={item.restaurant_id} style={cardStyle}>
              <div style={topRow}>
                <div>
                  <h3 style={{ margin: 0 }}>{item.name}</h3>
                  <div style={mutedText}>{item.address || "Address unavailable"}</div>
                </div>

                {item.distance_km !== null && item.distance_km !== undefined ? (
                  <div style={distanceBadge}>{item.distance_km} km</div>
                ) : null}
              </div>

              <div style={metaRow}>
                {item.category ? <span>{item.category}</span> : null}
                {item.phone ? <span>{item.phone}</span> : null}
                {item.rating ? <span>Rating: {item.rating}</span> : null}
              </div>

              {item.navigation_url ? (
                <div style={{ marginTop: 14 }}>
                  <a
                    href={item.navigation_url}
                    target="_blank"
                    rel="noreferrer"
                    style={linkButtonStyle}
                  >
                    Navigate
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
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
  background: "rgba(245, 158, 11, 0.18)",
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
  justifyContent: "space-between",
  gap: "12px",
  alignItems: "flex-start",
};

const mutedText: React.CSSProperties = {
  marginTop: "6px",
  fontSize: "13px",
  opacity: 0.75,
};

const metaRow: React.CSSProperties = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
  marginTop: "12px",
  fontSize: "13px",
  opacity: 0.85,
};

const distanceBadge: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: "12px",
  background: "rgba(245, 158, 11, 0.18)",
  fontWeight: 700,
};

const linkButtonStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: "12px",
  background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
  color: "#fff",
  textDecoration: "none",
  fontWeight: 700,
};