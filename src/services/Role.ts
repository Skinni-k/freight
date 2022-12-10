import { AppDataSource } from "../data-source";
import { Role } from "../entity";
import { getBrand } from "./Brand";

export const createRole = async (role: Partial<Role>) => {
  console.log("Get Brand:");
  const brand = await getBrand(1)

  console.log("Inserting a new role into the database...");
  const roleRepo = AppDataSource.getRepository(Role);
  role.brand = brand
  const savedRole = await roleRepo.save(role);
  console.log("Saved a new role with id: " + savedRole.id);
  return savedRole.id;
};

export const listRoles = async () => {
  console.log("Loading Roles from the database...");
  const roles = await AppDataSource.manager.find(Role);
  console.log("Loaded Roles: ", roles);
  return roles
};

export const getRole = async (id: number) => {
  console.log(`Getting role - ${id} from the database...`);
  const singleRole = await AppDataSource.manager.findOneBy(Role, { id })
  console.log("Role: ", singleRole);
  return singleRole
};

export const editRole = async (id: number, role: Partial<Role>) => {
  console.log(`Editing role - ${id} from the database...`);
  const updatedRole = await AppDataSource.manager.update(
    Role,
    { id },
    role
  );
  console.log("Updated Role: ", updatedRole);
  return updatedRole
};

export const deleteRole = async (id: number) => {
  console.log(`Removing role - ${id} from the database...`);
  const deletedRole = await AppDataSource.manager.delete(Role, { id });
  console.log("Removed Role: ", deletedRole);
  return deletedRole
};
