export interface TransitEstimate {
  minDays: number;
  maxDays: number;
}

export const TRANSIT_TIMES: Record<string, TransitEstimate> = {
  ship: { minDays: 45, maxDays: 60 },
  plane: { minDays: 7, maxDays: 14 },
};

export const getTransitLabel = (type: "ship" | "plane", daysLabel: string = "jours"): string => {
  const t = TRANSIT_TIMES[type];
  return `${t.minDays}-${t.maxDays} ${daysLabel}`;
};

export const getTransitDifference = (fasterLabel: string = "jours plus rapide"): string => {
  const shipAvg = (TRANSIT_TIMES.ship.minDays + TRANSIT_TIMES.ship.maxDays) / 2;
  const planeAvg = (TRANSIT_TIMES.plane.minDays + TRANSIT_TIMES.plane.maxDays) / 2;
  const diff = Math.round(shipAvg - planeAvg);
  return `~${diff} ${fasterLabel}`;
};
