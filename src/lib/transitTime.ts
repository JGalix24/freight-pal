export interface TransitEstimate {
  minDays: number;
  maxDays: number;
  label: string;
}

export const TRANSIT_TIMES: Record<string, TransitEstimate> = {
  ship: {
    minDays: 30,
    maxDays: 45,
    label: "30-45 jours",
  },
  plane: {
    minDays: 3,
    maxDays: 7,
    label: "3-7 jours",
  },
};

export const getTransitLabel = (type: "ship" | "plane"): string => {
  return TRANSIT_TIMES[type].label;
};

export const getTransitDifference = (): string => {
  const shipAvg = (TRANSIT_TIMES.ship.minDays + TRANSIT_TIMES.ship.maxDays) / 2;
  const planeAvg = (TRANSIT_TIMES.plane.minDays + TRANSIT_TIMES.plane.maxDays) / 2;
  const diff = Math.round(shipAvg - planeAvg);
  return `~${diff} jours plus rapide`;
};
