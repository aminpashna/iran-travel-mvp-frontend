import { useState } from "react";
import LanguageSwitcher from "./components/LanguageSwitcher";
import PlannerForm from "./components/PlannerForm";
import ResultView from "./components/ResultView";
import JsonPreview from "./components/JsonPreview";
import type { TripPlanResponse, TripRequest } from "./types/api";
import { t } from "./i18n";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const todayPlus = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

const defaultRequest: TripRequest = {
  origin: "Tehran",
  destination: "Rasht",
  departure_date: todayPlus(7),
  return_date: todayPlus(9),
  travelers: 2,
  budget_max_irr: 50000000,
  hotel_needed: true,
  preferences: ["city_center", "clean"],
};

export default function App() {
  const [request, setRequest] = useState<TripRequest>(defaultRequest);
  const [lastSubmittedRequest, setLastSubmittedRequest] =
    useState<TripRequest | null>(null);
  const [result, setResult] = useState<TripPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDebug, setShowDebug] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const submittedRequest: TripRequest = {
      origin: request.origin,
      destination: request.destination,
      departure_date: request.departure_date,
      return_date: request.return_date ?? null,
      travelers: Number(request.travelers),
      budget_max_irr: request.budget_max_irr ?? null,
      hotel_needed: Boolean(request.hotel_needed),
      preferences: [...request.preferences],
    };

    setLastSubmittedRequest(submittedRequest);

    try {
      const response = await fetch(`${API_BASE_URL}/api/trips/plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(submittedRequest),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.detail || "Trip planning failed.");
      }

      setResult(payload);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #0f172a 0%, #020617 55%, #000814 100%)",
        color: "white",
        padding: "24px",
        fontFamily: "Segoe UI, Tahoma, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
        <LanguageSwitcher />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "380px minmax(0, 1fr)",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div>
            <h1 style={{ marginTop: 0, marginBottom: "20px" }}>
              {t("trip_planner_title")}
            </h1>

            <PlannerForm
              value={request}
              onChange={setRequest}
              onSubmit={handleSubmit}
              loading={loading}
            />

            {error ? (
              <div
                style={{
                  marginTop: "16px",
                  padding: "16px",
                  borderRadius: "16px",
                  background: "rgba(127, 29, 29, 0.35)",
                  border: "1px solid rgba(248, 113, 113, 0.3)",
                }}
              >
                <strong>{t("error_title")}</strong>
                <div style={{ marginTop: "8px" }}>{error}</div>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setShowDebug((v) => !v)}
              style={{
                marginTop: "16px",
                padding: "10px 14px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {showDebug ? "Hide Debug" : "Show Debug"}
            </button>
          </div>

          <div style={{ minWidth: 0 }}>
            <ResultView result={result} />
          </div>
        </div>

        {showDebug && lastSubmittedRequest ? (
          <div style={{ display: "grid", gap: "24px", marginTop: "24px" }}>
            <JsonPreview title={t("submitted_request")} data={lastSubmittedRequest} />
            {result ? (
              <JsonPreview title={t("raw_api_response")} data={result} />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}