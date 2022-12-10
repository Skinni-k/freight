import { describe, expect, it, vi } from "vitest";
import { AppDataSource } from "../data-source";
import { employee } from "../constants/Employee";
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getEmployee,
  listEmployees,
} from "./Employee";

const employeeInfo = {
  id: 1,
  roleId: 1,
  name: "Kevin",
  surname: "Dewinter",
  seniority: "Manager",
};

const roleInfo = {
  id: 1,
  brandId: 1,
  name: "mechanic",
  category: "mechanic",
};

const brandInfo = {
  id: 1,
  name: "Mercedes",
};

AppDataSource.getRepository = vi.fn().mockReturnValue({
  save: vi.fn().mockResolvedValueOnce(employeeInfo),
});

AppDataSource.manager.find = vi.fn().mockReturnValue([employeeInfo]);

AppDataSource.manager.findOneBy = vi
  .fn()
  .mockReturnValueOnce(brandInfo)
  .mockReturnValueOnce(employeeInfo)
  .mockReturnValueOnce(roleInfo)

AppDataSource.manager.update = vi
  .fn()
  .mockReturnValue({ ...employeeInfo, name: "Sheldon" });

AppDataSource.manager.delete = vi.fn().mockReturnValue(employeeInfo);

describe("Employee CRUD", () => {
  it("Creates a employee entry", async () => {
    const id = await createEmployee(employee);
    expect(id).toEqual(1);
    expect(id).not.toEqual(5);
  });

  it("Lists employees", async () => {
    const employees = await listEmployees();
    expect(employees).toEqual([
      {
        id: 1,
        roleId: 1,
        name: "Kevin",
        surname: "Dewinter",
        seniority: "Manager",
      },
    ]);
    expect(employees).not.toEqual([{ ...employee, id: 2 }]);
    expect(employees).not.toEqual(5);
  });

  it("Gets one employee", async () => {
    const singleEmployee = await getEmployee(1);
    expect(singleEmployee).toEqual(employeeInfo);
    expect(singleEmployee).not.toEqual({ ...employee, id: 2 });
    expect(singleEmployee).not.toEqual(5);
  });

  it("Edits a employee", async () => {
    const updatedEmployee = await editEmployee(1, { name: "Sheldon" });
    expect(updatedEmployee).toEqual({
      id: 1,
      roleId: 1,
      name: "Sheldon",
      surname: "Dewinter",
      seniority: "Manager",
    });
    expect(updatedEmployee).not.toEqual({ id: 2, name: "Nikita" });
    expect(updatedEmployee).not.toEqual(5);
  });

  it("Delete a employee", async () => {
    const deletedEmployee = await deleteEmployee(1);
    expect(deletedEmployee).toEqual(employeeInfo);
    expect(deletedEmployee).not.toEqual({ id: 2, name: "Sheldon" });
    expect(deletedEmployee).not.toEqual(5);
  });
});
