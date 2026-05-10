import { MapPin, Navigation, Phone, UtensilsCrossed, X } from "lucide-react";
import type { RestaurantResult } from "../types/api";

type Props = {
  restaurant: RestaurantResult | null;
  onClose: () => void;
};

export default function RestaurantDetailsModal({ restaurant, onClose }: Props) {
  if (!restaurant) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="eyebrow">Restaurant details</div>
            <h2>{restaurant.name}</h2>
          </div>
          <button className="modal-close" onClick={onClose} type="button">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-subtitle">
            {restaurant.address || "Nearby destination restaurant"}
          </p>

          <div className="modal-stats">
            <div className="modal-stat">
              <div className="modal-stat__icon">
                <UtensilsCrossed size={16} />
              </div>
              <div>
                <div className="modal-stat__label">Category</div>
                <div className="modal-stat__value">{restaurant.category || "Restaurant"}</div>
              </div>
            </div>

            <div className="modal-stat">
              <div className="modal-stat__icon">
                <MapPin size={16} />
              </div>
              <div>
                <div className="modal-stat__label">Distance</div>
                <div className="modal-stat__value">
                  {restaurant.distance_km ?? "—"} km
                </div>
              </div>
            </div>

            <div className="modal-stat">
              <div className="modal-stat__icon">
                <Phone size={16} />
              </div>
              <div>
                <div className="modal-stat__label">Phone</div>
                <div className="modal-stat__value">
                  {restaurant.phone || "Not available"}
                </div>
              </div>
            </div>

            <div className="modal-stat">
              <div className="modal-stat__icon">
                <Navigation size={16} />
              </div>
              <div>
                <div className="modal-stat__label">Navigation</div>
                <div className="modal-stat__value">Ready</div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            {restaurant.navigation_url ? (
              <a
                href={restaurant.navigation_url}
                target="_blank"
                rel="noreferrer"
                className="primary-button modal-book-button"
              >
                Navigate to restaurant
              </a>
            ) : (
              <button type="button" className="primary-button modal-book-button disabled">
                Navigation unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
