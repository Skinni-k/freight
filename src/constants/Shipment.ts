import { Shipment } from "../entity";

export const shipment: Omit<Shipment, "id" | "customer"> = {
  weight: 1.234,
  value: 1234,
  origin: "Waterloo",
  destination: "Kitchener",
  
};
