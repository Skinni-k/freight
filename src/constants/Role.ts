import { Role } from "../entity";

export const role: Omit<Role, "id" | "brand"> = {
  name: "Timber",
  category: "senior",
};
