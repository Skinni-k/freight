import { Customer } from "../entity";
import { shipment } from "./Shipment";

export const customer: Omit<Customer, "id" | "shipment"> = {
  name: "Timber",
  address: "Waterloo",
  mobile: 1234567890,
  phone: 0912343545,
};
