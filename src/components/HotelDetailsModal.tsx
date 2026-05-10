import { BedDouble, MapPin, Star, Wallet, X } from "lucide-react";
import type { HotelResult } from "../types/api";

type Props = {
  hotel: HotelResult | null;
  onClose: () => void;
};

function formatIrr(value?: number | null) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US").format(value) + " IRR";
}

export default function HotelDetailsModal({ hotel, onClose }: Props) {
  if (!hotel) return null;

  const canBook = Boolean(hotel.booking_url);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="eyebrow">Hotel details</div>
            <h2>{hotel.name}</h2>
          </div>
          <button className="modal-close" onClick={onClose} type="button">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-subtitle">
            {hotel.district || hotel.city_name || "Recommended area"}
          </p>

          <div className="modal-stats">
            <div className="modal-stat">
              <div className="modal-stat__icon">
                <Wallet size={16} />
              </div>
              <div>
                <div className="modal-stat__label">Total price</div>
                <div className="modal-stat__value">
                  {formatIrr(hotel.total_price_irr)}
                </div>
              </div>
            </div>

            <div className="modal-stat">
              <div className="modal-stat__icon">
                <Star size={16} />
              </div>
              <div>
                <div className="modal-stat__label">Rating</div>
                <div className="modal-stat__value">
                  {hotel.rating ? hotel.rating.toFixed(1) : "—"}
                </div>
              </div>
            </div>

            <div className="modal-stat">
              <div className="modal-stat__icon">
                <MapPin size={16} />
              </div>
              <div>
                <div className="modal-stat__label">Distance to center</div>
                <div className="modal-stat__value">
                  {hotel.distance_to_center_km ?? "—"} km
                </div>
              </div>
            </div>

            <div className="modal-stat">
              <div className="modal-stat__icon">
                <BedDouble size={16} />
              </div>
              <div>
                <div className="modal-stat__label">Reviews</div>
                <div className="modal-stat__value">
                  {hotel.review_count ?? "—"}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3>Amenities</h3>
            <div className="modal-amenities">
              {(hotel.amenities || []).length ? (
                (hotel.amenities || []).map((a) => <span key={a}>{a}</span>)
              ) : (
                <span>No amenities available</span>
              )}
            </div>
          </div>

          <div className="modal-section">
            <h3>Stay recommendation</h3>
            <p className="modal-description">
              {hotel.description ||
                `${hotel.name} is currently one of the recommended stay options for this trip based on distance, price, and rating.`}
            </p>
          </div>

          <div className="modal-actions">
            {canBook ? (
              <a
                href={hotel.booking_url!}
                target="_blank"
                rel="noreferrer"
                className="primary-button modal-book-button"
              >
                Book now
              </a>
            ) : (
              <button type="button" className="primary-button modal-book-button disabled">
                Booking coming soon
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}