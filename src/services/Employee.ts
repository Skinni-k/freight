import { AppDataSource } from "../data-source";
import { Role } from "../entity";
import { Employee } from "../entity/Employee";

export const createEmployee = async (employee: Partial<Employee>, role_id: number) => {
  console.log("Get Role:");
  const role = await AppDataSource.manager.findOneBy(Role, { id: role_id });

  console.log("Inserting a new employee into the database...");
  const employeeRepo = AppDataSource.getRepository(Employee);
  employee.role = role
  await employeeRepo.save(employee);
  console.log("Saved a new employee with id: " + employee.id);
  return employee.id;
};

export const listEmployees = async () => {
  console.log("Loading Employee from the database...");
  const employees = await AppDataSource.manager.find(Employee);
  console.log("Loaded Employee: ", employees);
};

export const getEmployee = async (id: number) => {
  console.log(`Getting employee - ${id} from the database...`);
  const singleEmployee = await AppDataSource.manager.findOneBy(Employee, { id })
  console.log("Employee: ", singleEmployee);
};

export const editEmployee = async (id: number, employee: Partial<Employee>) => {
  console.log(`Editing employee - ${id} from the database...`);
  const updatedEmployee = await AppDataSource.manager.update(
    Employee,
    { id },
    employee
  );
  console.log("Updated Employee: ", updatedEmployee);
};

export const deleteEmployee = async (id: number) => {
  console.log(`Removing employee - ${id} from the database...`);
  const employee = await AppDataSource.manager.delete(Employee, { id });
  console.log("Removed Employee: ", employee);
};
