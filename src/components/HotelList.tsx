import type { HotelResponse } from "../types/api";

type Props = {
  hotels: HotelResponse[];
};

function formatIrr(value?: number | null) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US").format(value) + " IRR";
}

export default function HotelList({ hotels }: Props) {
  return (
    <section style={panelStyle}>
      <div style={eyebrow}>Hotels</div>
      <h2 style={{ marginTop: 12 }}>Recommended hotels</h2>

      {!hotels?.length ? (
        <p style={{ opacity: 0.75 }}>No hotels were returned for this trip.</p>
      ) : (
        <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
          {hotels.map((hotel) => (
            <article key={hotel.hotel_id} style={cardStyle}>
              <div style={topRow}>
                <div>
                  <h3 style={{ margin: 0 }}>{hotel.name}</h3>
                  <div style={mutedText}>
                    {hotel.district || hotel.city_name || "Recommended area"}
                  </div>
                </div>

                <div style={ratingBadge}>
                  {hotel.rating ? hotel.rating.toFixed(1) : "—"}
                </div>
              </div>

              <div style={metaRow}>
                <span>{hotel.distance_to_center_km ?? "—"} km to center</span>
                <span>{formatIrr(hotel.total_price_irr)}</span>
                <span>{hotel.review_count ?? 0} reviews</span>
              </div>

              {hotel.amenities?.length ? (
                <div style={chipRow}>
                  {hotel.amenities.map((amenity) => (
                    <span key={amenity} style={chip}>
                      {amenity}
                    </span>
                  ))}
                </div>
              ) : null}

              {hotel.booking_url ? (
                <div style={{ marginTop: 14 }}>
                  <a
                    href={hotel.booking_url}
                    target="_blank"
                    rel="noreferrer"
                    style={linkButtonStyle}
                  >
                    Book hotel
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
  background: "rgba(16, 185, 129, 0.18)",
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

const chipRow: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginTop: "14px",
};

const chip: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  fontSize: "12px",
};

const ratingBadge: React.CSSProperties = {
  minWidth: "48px",
  height: "40px",
  borderRadius: "12px",
  background: "rgba(124, 58, 237, 0.22)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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