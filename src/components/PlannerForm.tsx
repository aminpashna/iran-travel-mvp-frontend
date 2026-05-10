import type { TripRequest } from "../types/api";
import { t } from "../i18n";

type Props = {
  value: TripRequest;
  onChange: (value: TripRequest) => void;
  onSubmit: () => void;
  loading?: boolean;
};

function togglePreference(current: string[], item: string): string[] {
  if (current.includes(item)) {
    return current.filter((x) => x !== item);
  }
  return [...current, item];
}

export default function PlannerForm({
  value,
  onChange,
  onSubmit,
  loading,
}: Props) {
  const update = <K extends keyof TripRequest>(key: K, next: TripRequest[K]) => {
    onChange({
      ...value,
      [key]: next,
    });
  };

  const preferenceItems = [
    { key: "city_center", label: t("city_center") },
    { key: "clean", label: t("clean") },
    { key: "parking", label: t("parking") },
    { key: "breakfast", label: t("breakfast") },
    { key: "family_friendly", label: t("family_friendly") },
  ];

  return (
    <section
      style={{
        padding: "20px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ display: "grid", gap: "14px" }}>
        <div>
          <label>{t("origin")}</label>
          <input
            value={value.origin}
            onChange={(e) => update("origin", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label>{t("destination")}</label>
          <input
            value={value.destination}
            onChange={(e) => update("destination", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label>{t("departure_date")}</label>
          <input
            type="date"
            value={value.departure_date}
            onChange={(e) => update("departure_date", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label>{t("return_date")}</label>
          <input
            type="date"
            value={value.return_date ?? ""}
            onChange={(e) => update("return_date", e.target.value || null)}
            style={inputStyle}
          />
        </div>

        <div>
          <label>{t("travelers")}</label>
          <input
            type="number"
            min={1}
            value={value.travelers}
            onChange={(e) => update("travelers", Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        <div>
          <label>{t("budget")}</label>
          <input
            type="number"
            min={0}
            value={value.budget_max_irr ?? 0}
            onChange={(e) => update("budget_max_irr", Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "8px",
          }}
        >
          <input
            type="checkbox"
            checked={value.hotel_needed}
            onChange={(e) => update("hotel_needed", e.target.checked)}
          />
          <span>{t("hotel_needed")}</span>
        </label>

        <div>
          <div style={{ marginBottom: "10px" }}>{t("preferences")}</div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {preferenceItems.map((item) => {
              const active = value.preferences.includes(item.key);

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() =>
                    update(
                      "preferences",
                      togglePreference(value.preferences, item.key),
                    )
                  }
                  style={{
                    padding: "8px 12px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: active
                      ? "rgba(124, 58, 237, 0.35)"
                      : "rgba(255,255,255,0.05)",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          style={{
            marginTop: "8px",
            padding: "14px 16px",
            borderRadius: "14px",
            border: "none",
            background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? t("loading_title") : t("plan_trip")}
        </button>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "6px",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  boxSizing: "border-box",
};