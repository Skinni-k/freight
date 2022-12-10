import { Employee } from "../entity/Employee";

export const employee: Omit<Employee, "id" | "role"> = {
  name: "Timber",
  surname: "Saw",
  seniority: "senior",
};
