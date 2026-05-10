export type TripRequest = {
  origin: string;
  destination: string;
  departure_date: string;
  return_date: string | null;
  travelers: number;
  budget_max_irr: number | null;
  hotel_needed: boolean;
  preferences: string[];
};

export type RouteStep = {
  instruction: string;
  distance_km: number;
  duration_min: number;
};

export type RouteResponse = {
  route_id: string;
  distance_km: number;
  duration_min: number;
  fuel_estimate_irr?: number | null;
  tolls_estimate_irr?: number | null;
  risk_flags: string[];
  polyline?: string | null;
  navigation_url?: string | null;
  steps: RouteStep[];
};

export type WeatherResponse = {
  travel_date: string;
  risk_level: string;
  risk_score: number;
  summary_fa: string;
  signals: string[];
};

export type HotelResponse = {
  hotel_id: string;
  provider: string;
  name: string;
  city_name: string;
  district?: string | null;
  distance_to_center_km?: number | null;
  nightly_price_irr?: number | null;
  total_price_irr?: number | null;
  rating?: number | null;
  review_count?: number | null;
  amenities: string[];
  booking_url?: string | null;
};

export type RestaurantResponse = {
  restaurant_id: string;
  name: string;
  address?: string | null;
  lat: number;
  lon: number;
  distance_km?: number | null;
  category?: string | null;
  phone?: string | null;
  rating?: number | null;
  navigation_url?: string | null;
};

export type TransportOptionResponse = {
  mode: string;
  label: string;
  provider: string;
  total_price_irr: number;
  duration_min: number;
  notes: string;
  tags: string[];
};

export type AISummaryResponse = {
  headline: string;
  summary: string;
  recommendation_reason: string;
  weather_note: string;
  drive_tip: string;
  best_hotel_name?: string | null;
  confidence: string;
};

export type ItineraryDayResponse = {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  notes: string[];
};

export type ItineraryResponse = {
  days: ItineraryDayResponse[];
};

export type TripPlanResponse = {
  trip_request_id: string;
  origin_place_id: string;
  destination_place_id: string;
  route: RouteResponse;
  weather?: WeatherResponse | null;
  hotels: HotelResponse[];
  restaurants: RestaurantResponse[];
  transport_options: TransportOptionResponse[];
  recommended_transport_mode?: string | null;
  warnings: string[];
  ai_summary?: AISummaryResponse | null;
  itinerary?: ItineraryResponse | null;
};