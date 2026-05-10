import { useState } from "react";
import {
  AlertTriangle,
  BedDouble,
  Car,
  CloudSun,
  Fuel,
  MapPinned,
  Navigation,
  Plane,
  Route,
  Sparkles,
  Train,
  UtensilsCrossed
} from "lucide-react";
import type {
  HotelResult,
  RestaurantResult,
  RouteStep,
  TransportOption,
  TripPlanResponse
} from "../types/api";
import HotelDetailsModal from "./HotelDetailsModal";
import RestaurantDetailsModal from "./RestaurantDetailsModal";

type Props = {
  result: TripPlanResponse | null;
};

function formatIrr(value?: number | null) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US").format(value) + " IRR";
}

function formatDuration(minutes?: number) {
  if (!minutes) return "—";
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}h ${mins}m`;
}

function modeIcon(mode: string) {
  switch (mode) {
    case "drive":
      return <Car size={18} />;
    case "train":
      return <Train size={18} />;
    case "flight":
      return <Plane size={18} />;
    default:
      return <Route size={18} />;
  }
}

function niceMode(mode: string) {
  switch (mode) {
    case "drive":
      return "Drive";
    case "train":
      return "Train";
    case "flight":
      return "Flight";
    default:
      return mode;
  }
}

function prettyTag(tag: string) {
  switch (tag) {
    case "cheapest":
      return "Cheapest";
    case "fastest":
      return "Fastest";
    case "balanced":
      return "Balanced";
    case "real-data":
      return "Real data";
    case "mock-data":
      return "Mock data";
    case "comfortable":
      return "Comfort";
    case "flexible":
      return "Flexible";
    default:
      return tag;
  }
}

function HotelCard({ hotel, highlight }: { hotel: HotelResult; highlight?: string }) {
  return (
    <article className="hotel-card hotel-card--clickable">
      <div className="hotel-card__top">
        <div>
          <h4>{hotel.name}</h4>
          <p>{hotel.district || hotel.city_name || "Recommended area"}</p>
        </div>
        <div className="hotel-card__rating">
          {hotel.rating ? hotel.rating.toFixed(1) : "—"}
        </div>
      </div>

      <div className="hotel-card__meta">
        <span>{hotel.distance_to_center_km ?? "—"} km to center</span>
        <span>{formatIrr(hotel.total_price_irr)}</span>
      </div>

      <div className="hotel-card__amenities">
        {highlight ? <span>{highlight}</span> : null}
        {(hotel.amenities || []).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}

function RestaurantCard({ restaurant }: { restaurant: RestaurantResult }) {
  return (
    <article className="hotel-card hotel-card--clickable">
      <div className="hotel-card__top">
        <div>
          <h4>{restaurant.name}</h4>
          <p>{restaurant.address || restaurant.category || "Restaurant"}</p>
        </div>
        <div className="hotel-card__rating">
          <UtensilsCrossed size={18} />
        </div>
      </div>

      <div className="hotel-card__meta">
        <span>{restaurant.distance_km ?? "—"} km away</span>
        <span>{restaurant.category || "Restaurant"}</span>
      </div>

      <div className="hotel-card__amenities">
        {restaurant.phone ? <span>{restaurant.phone}</span> : <span>Tap for details</span>}
      </div>
    </article>
  );
}

function TransportCard({
  option,
  recommendedMode
}: {
  option: TransportOption;
  recommendedMode?: string | null;
}) {
  const isRecommended = option.mode === recommendedMode;

  return (
    <article className="hotel-card">
      <div className="hotel-card__top">
        <div>
          <h4>{niceMode(option.mode)}</h4>
          <p>{option.provider}</p>
        </div>
        <div className="hotel-card__rating">{modeIcon(option.mode)}</div>
      </div>

      <div className="hotel-card__meta">
        <span>{formatDuration(option.duration_min)}</span>
        <span>{formatIrr(option.total_price_irr)}</span>
      </div>

      <div className="hotel-card__amenities">
        {isRecommended ? <span>Recommended</span> : null}
        {(option.tags || []).map((tag) => (
          <span key={tag}>{prettyTag(tag)}</span>
        ))}
      </div>

      <div style={{ marginTop: "14px", color: "var(--text-soft)", lineHeight: 1.7 }}>
        {option.notes}
      </div>
    </article>
  );
}

function RouteStepCard({ step, index }: { step: RouteStep; index: number }) {
  return (
    <article className="hotel-card">
      <div className="hotel-card__top">
        <div>
          <h4>Step {index + 1}</h4>
          <p>{step.instruction}</p>
        </div>
        <div className="hotel-card__rating">{index + 1}</div>
      </div>

      <div className="hotel-card__meta">
        <span>{step.distance_km} km</span>
        <span>{formatDuration(step.duration_min)}</span>
      </div>
    </article>
  );
}

export default function ResultView({ result }: Props) {
  const [selectedHotel, setSelectedHotel] = useState<HotelResult | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantResult | null>(null);

  if (!result) {
    return (
      <section className="panel result-placeholder">
        <Sparkles size={22} />
        <h3>Your trip result will appear here</h3>
        <p>
          Run a trip from the planner and you will see route, weather, hotel
          recommendations, AI guidance, transport comparison, driving navigation, and restaurants.
        </p>
      </section>
    );
  }

  const hotels = result.hotels || [];
  const restaurants = result.restaurants || [];
  const transportOptions = result.transport_options || [];
  const warnings = result.warnings || [];
  const routeSteps = result.route?.steps || [];
  const isDriveRecommended = result.recommended_transport_mode === "drive";
  const restaurantPanelTitle = isDriveRecommended
    ? "Food stops on your drive"
    : "Restaurants near your destination";

  return (
    <>
      <section className="results">
        {warnings.length ? (
          <div className="panel" style={{ borderColor: "rgba(251, 191, 36, 0.35)" }}>
            <div className="panel__header">
              <div>
                <div className="eyebrow">Warnings</div>
                <h2>Partial results</h2>
              </div>
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              {warnings.map((warning) => (
                <div
                  key={warning}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                    color: "#fde68a"
                  }}
                >
                  <AlertTriangle size={18} />
                  <div>{warning}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {result.ai_summary ? (
          <div className="panel ai-summary-panel">
            <div className="panel__header">
              <div>
                <div className="eyebrow">AI recommendation</div>
                <h2>{result.ai_summary.headline}</h2>
              </div>
            </div>

            <p className="ai-summary-text">{result.ai_summary.summary}</p>

            <div className="ai-summary-grid">
              <div className="ai-summary-item">
                <h4>Why this works</h4>
                <p>{result.ai_summary.recommendation_reason}</p>
              </div>
              <div className="ai-summary-item">
                <h4>Weather note</h4>
                <p>{result.ai_summary.weather_note}</p>
              </div>
              <div className="ai-summary-item">
                <h4>Drive tip</h4>
                <p>{result.ai_summary.drive_tip}</p>
              </div>
              <div className="ai-summary-item">
                <h4>Best hotel</h4>
                <p>{result.ai_summary.best_hotel_name || "No specific hotel selected"}</p>
              </div>
            </div>

            <div className="chips">
              <span className="chip chip--soft">
                Confidence: {result.ai_summary.confidence || "—"}
              </span>
            </div>
          </div>
        ) : null}

        {transportOptions.length ? (
          <div className="results__hotels panel">
            <div className="panel__header">
              <div>
                <div className="eyebrow">Transport comparison</div>
                <h2>Drive vs train vs flight</h2>
              </div>
              <div className="panel__hint">
                <Route size={16} />
                Best match: {niceMode(result.recommended_transport_mode || "unknown")}
              </div>
            </div>

            <div className="hotels-grid">
              {transportOptions.map((option) => (
                <TransportCard
                  key={`${option.mode}-${option.provider}`}
                  option={option}
                  recommendedMode={result.recommended_transport_mode}
                />
              ))}
            </div>
          </div>
        ) : null}

        {isDriveRecommended ? (
          <div className="results__hotels panel">
            <div className="panel__header">
              <div>
                <div className="eyebrow">Drive navigation</div>
                <h2>Start driving guidance</h2>
              </div>
              <div className="panel__hint">
                <Navigation size={16} />
                Turn-by-turn preview
              </div>
            </div>

            <div className="summary-grid">
              <div className="summary-card">
                <div className="summary-card__icon">
                  <Route size={18} />
                </div>
                <div className="summary-card__label">Distance</div>
                <div className="summary-card__value">
                  {result.route?.distance_km ?? "—"} km
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-card__icon">
                  <Navigation size={18} />
                </div>
                <div className="summary-card__label">Navigation</div>
                <div className="summary-card__value">
                  {routeSteps.length ? `${routeSteps.length} steps` : "Preview ready"}
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-card__icon">
                  <Fuel size={18} />
                </div>
                <div className="summary-card__label">Fuel estimate</div>
                <div className="summary-card__value">
                  {formatIrr(result.route?.fuel_estimate_irr)}
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-card__icon">
                  <CloudSun size={18} />
                </div>
                <div className="summary-card__label">Weather</div>
                <div className="summary-card__value capitalize">
                  {result.weather?.risk_level || "—"}
                </div>
              </div>
            </div>

            {result.route?.navigation_url ? (
              <div style={{ marginTop: "18px" }}>
                <a
                  href={result.route.navigation_url}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    maxWidth: "260px"
                  }}
                >
                  Start navigation
                </a>
              </div>
            ) : null}

            {routeSteps.length ? (
              <div style={{ marginTop: "22px" }}>
                <div className="panel__header" style={{ marginBottom: "14px" }}>
                  <div>
                    <div className="eyebrow">Route steps</div>
                    <h2>Turn-by-turn preview</h2>
                  </div>
                </div>

                <div className="hotels-grid">
                  {routeSteps.map((step, index) => (
                    <RouteStepCard key={`${index}-${step.instruction}`} step={step} index={index} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {restaurants.length > 0 ? (
          <div className="results__hotels panel">
            <div className="panel__header">
              <div>
                <div className="eyebrow">{isDriveRecommended ? "Drive food stops" : "Destination food"}</div>
                <h2>{restaurantPanelTitle}</h2>
              </div>
              <div className="panel__hint">
                <UtensilsCrossed size={16} />
                {restaurants.length} places
              </div>
            </div>

            <div className="hotels-grid">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.restaurant_id}
                  onClick={() => setSelectedRestaurant(restaurant)}
                  style={{ cursor: "pointer" }}
                >
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="results__summary panel">
          <div className="panel__header">
            <div>
              <div className="eyebrow">Drive summary</div>
              <h2>Road trip dashboard</h2>
            </div>
          </div>

          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-card__icon">
                <Route size={18} />
              </div>
              <div className="summary-card__label">Distance</div>
              <div className="summary-card__value">
                {result.route?.distance_km ?? "—"} km
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-card__icon">
                <MapPinned size={18} />
              </div>
              <div className="summary-card__label">Drive time</div>
              <div className="summary-card__value">
                {formatDuration(result.route?.duration_min)}
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-card__icon">
                <Fuel size={18} />
              </div>
              <div className="summary-card__label">Fuel estimate</div>
              <div className="summary-card__value">
                {formatIrr(result.route?.fuel_estimate_irr)}
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-card__icon">
                <CloudSun size={18} />
              </div>
              <div className="summary-card__label">Weather risk</div>
              <div className="summary-card__value capitalize">
                {result.weather?.risk_level || "—"}
              </div>
            </div>
          </div>

          <div className="weather-panel">
            <h3>Weather insight</h3>
            <p>
              {result.weather?.summary_fa ||
                result.weather?.summary_en ||
                "No weather narrative returned."}
            </p>

            {result.weather?.signals?.length ? (
              <div className="chips">
                {result.weather.signals.map((signal) => (
                  <span className="chip chip--soft" key={signal}>
                    {signal}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="results__hotels panel">
          <div className="panel__header">
            <div>
              <div className="eyebrow">Stay options</div>
              <h2>Hotel shortlist</h2>
            </div>
            <div className="panel__hint">
              <BedDouble size={16} />
              {hotels.length} options
            </div>
          </div>

          {hotels.length ? (
            <div className="hotels-grid">
              {hotels.map((hotel, index) => (
                <div
                  key={hotel.hotel_id}
                  onClick={() => setSelectedHotel(hotel)}
                  style={{ cursor: "pointer" }}
                >
                  <HotelCard
                    hotel={hotel}
                    highlight={index === 0 ? "Recommended stay" : undefined}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              No hotels were returned for this trip yet.
            </div>
          )}
        </div>
      </section>

      <HotelDetailsModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
      <RestaurantDetailsModal restaurant={selectedRestaurant} onClose={() => setSelectedRestaurant(null)} />
    </>
  );
}