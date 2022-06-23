import { StatChange } from "~/application/dtos/stats/StatChange";

export function getStatChangePercentage(added: number, total: number): number {
  if (total <= 0) {
    return 100;
  }
  return Math.round((added * 100) / total);
}

export function getStatChangeType(added: number, total: number): StatChange {
  const change = getStatChangePercentage(added, total);
  if (change === 0) {
    return StatChange.Equal;
  }
  return change > 0 ? StatChange.Increase : StatChange.Decrease;
}
