import { AppDataSource } from "../data-source";
import { Role } from "../entity";

export const createRole = async (role: Partial<Role>, role_id: number) => {
  console.log("Get Role:");
  const role = await AppDataSource.manager.findOneBy(Role, { id: role_id });

  console.log("Inserting a new role into the database...");
  const roleRepo = AppDataSource.getRepository(Role);
  role.role = role
  await roleRepo.save(role);
  console.log("Saved a new role with id: " + role.id);
  return role.id;
};

export const listRoles = async () => {
  console.log("Loading Roles from the database...");
  const roles = await AppDataSource.manager.find(Role);
  console.log("Loaded Roles: ", roles);
};

export const getRole = async (id: number) => {
  console.log(`Getting role - ${id} from the database...`);
  const singleRole = await AppDataSource.manager.findOneBy(Role, { id })
  console.log("Role: ", singleRole);
};

export const editRole = async (id: number, role: Partial<Role>) => {
  console.log(`Editing role - ${id} from the database...`);
  const updatedRole = await AppDataSource.manager.update(
    Role,
    { id },
    role
  );
  console.log("Updated Role: ", updatedRole);
};

export const deleteRole = async (id: number) => {
  console.log(`Removing role - ${id} from the database...`);
  const role = await AppDataSource.manager.delete(Role, { id });
  console.log("Removed Role: ", role);
};
