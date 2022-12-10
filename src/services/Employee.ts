import { AppDataSource } from "../data-source";
import { Employee } from "../entity/Employee";
import { getRole } from "./Role";

export const createEmployee = async (employee: Partial<Employee>) => {
  console.log("Get Role:");
  const role = await getRole(1)

  console.log("Inserting a new employee into the database...");
  const employeeRepo = AppDataSource.getRepository(Employee);
  employee.role = role
  const savedEmployee = await employeeRepo.save(employee);
  console.log("Saved a new employee with id: " + savedEmployee.id);
  return savedEmployee.id;
};

export const listEmployees = async () => {
  console.log("Loading Employee from the database...");
  const employees = await AppDataSource.manager.find(Employee);
  console.log("Loaded Employee: ", employees);
  return employees
};

export const getEmployee = async (id: number) => {
  console.log(`Getting employee - ${id} from the database...`);
  const singleEmployee = await AppDataSource.manager.findOneBy(Employee, { id })
  console.log("Employee: ", singleEmployee);
  return singleEmployee
};

export const editEmployee = async (id: number, employee: Partial<Employee>) => {
  console.log(`Editing employee - ${id} from the database...`);
  const updatedEmployee = await AppDataSource.manager.update(
    Employee,
    { id },
    employee
  );
  console.log("Updated Employee: ", updatedEmployee);
  return updatedEmployee
};

export const deleteEmployee = async (id: number) => {
  console.log(`Removing employee - ${id} from the database...`);
  const deletedEmployee = await AppDataSource.manager.delete(Employee, { id });
  console.log("Removed Employee: ", deletedEmployee);
  return deletedEmployee
};
