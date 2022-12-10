import { Repair } from "../entity";

export const repair: Omit<Repair, "id" | "truck" | "mechanic"> = {
  estimated_days: 1,
};
