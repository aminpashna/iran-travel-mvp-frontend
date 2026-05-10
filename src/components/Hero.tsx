import { Compass, CloudSun, Hotel, Route } from "lucide-react";
import StatPill from "./StatPill";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__badge">Iran Travel MVP</div>
      <h1>
        Plan an Iran road trip with a frontend that actually feels premium.
      </h1>
      <p>
        SafarYar combines Azure Maps routing, weather intelligence, and hotel
        recommendations into one elegant planning flow.
      </p>

      <div className="hero__stats">
        <StatPill icon={<Compass size={18} />} label="Maps" value="Azure Maps" />
        <StatPill icon={<CloudSun size={18} />} label="Weather" value="Open-Meteo" />
        <StatPill icon={<Hotel size={18} />} label="Stay" value="Hotel shortlist" />
        <StatPill icon={<Route size={18} />} label="Focus" value="Drive + stay MVP" />
      </div>
    </section>
  );
}
