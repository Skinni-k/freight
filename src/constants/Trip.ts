import { Trip } from "../entity";

export const trip: Omit<Trip, "id" | "truck" | "employee" | "shipment"> = {
  origin: "Waterloo",
  destination: "Kitchener",
};
