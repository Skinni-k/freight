import { describe, expect, it, vi } from "vitest";
import { AppDataSource } from "../data-source";
import { role } from "../constants/Role";
import { createRole, deleteRole, editRole, getRole, listRoles } from "./Role";

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
  save: vi.fn().mockResolvedValueOnce(roleInfo),
});

AppDataSource.manager.find = vi.fn().mockReturnValue([roleInfo]);

AppDataSource.manager.findOneBy = vi
  .fn()
  .mockReturnValueOnce(brandInfo)
  .mockReturnValueOnce(roleInfo);

AppDataSource.manager.update = vi
  .fn()
  .mockReturnValue({ ...roleInfo, name: "Kevin" });

AppDataSource.manager.delete = vi.fn().mockReturnValue(roleInfo);

describe("Role CRUD", () => {
  it("Creates a role entry", async () => {
    const id = await createRole(role);
    expect(id).toEqual(1);
    expect(id).not.toEqual(5);
  });

  it("Lists roles", async () => {
    const roles = await listRoles();
    expect(roles).toEqual([roleInfo]);
    expect(roles).not.toEqual([{ ...role, id: 2 }]);
    expect(roles).not.toEqual(5);
  });

  it("Gets one role", async () => {
    const singleRoles = await getRole(1);
    expect(singleRoles).toEqual(roleInfo);
    expect(singleRoles).not.toEqual({ ...role, id: 2 });
    expect(singleRoles).not.toEqual(5);
  });

  it("Edits a role", async () => {
    const updatedRole = await editRole(1, { name: "Kevin" });
    expect(updatedRole).toEqual({
      id: 1,
      brandId: 1,
      name: "Kevin",
      category: "mechanic",
    });
    expect(updatedRole).not.toEqual(roleInfo);
    expect(updatedRole).not.toEqual(5);
  });

  it("Delete a role", async () => {
    const deletedRole = await deleteRole(1);
    expect(deletedRole).toEqual(roleInfo);
    expect(deletedRole).not.toEqual({ id: 2, name: "Kevin" });
    expect(deletedRole).not.toEqual(5);
  });
});
