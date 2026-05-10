import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  value: string;
};

export default function StatPill({ icon, label, value }: Props) {
  return (
    <div className="stat-pill">
      <div className="stat-pill__icon">{icon}</div>
      <div>
        <div className="stat-pill__label">{label}</div>
        <div className="stat-pill__value">{value}</div>
      </div>
    </div>
  );
}
