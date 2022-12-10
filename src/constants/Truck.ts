import { Truck } from "../entity";

export const truck: Omit<Truck, "id" | "brand"> = {
  load: 1,
  capacity: 1,
  year: 2021,
  number_of_Repair: 5,
};
