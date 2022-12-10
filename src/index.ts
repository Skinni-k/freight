import { employee } from "./constants/Employee";
import { AppDataSource } from "./data-source";
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getEmployee,
  listEmployees,
} from "./services/Employee";

AppDataSource.initialize()
  .then(async () => {
    const id = await createEmployee(employee, 1);
    await listEmployees();
    await editEmployee(id, { name: "Kevin" });
    await getEmployee(id);
    await deleteEmployee(id);
    await listEmployees();
  })
  .catch((error) => console.log(error));
