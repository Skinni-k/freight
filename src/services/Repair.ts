import { AppDataSource } from "../data-source";
import { Role } from "../entity";
import { Repair } from "../entity/Repair";

export const createRepair = async (repair: Partial<Repair>, role_id: number) => {
  console.log("Get Role:");
  const role = await AppDataSource.manager.findOneBy(Role, { id: role_id });

  console.log("Inserting a new repair into the database...");
  const repairRepo = AppDataSource.getRepository(Repair);
  repair.role = role
  await repairRepo.save(repair);
  console.log("Saved a new repair with id: " + repair.id);
  return repair.id;
};

export const listRepairs = async () => {
  console.log("Loading Repair from the database...");
  const repairs = await AppDataSource.manager.find(Repair);
  console.log("Loaded Repair: ", repairs);
};

export const getRepair = async (id: number) => {
  console.log(`Getting repair - ${id} from the database...`);
  const singleRepair = await AppDataSource.manager.findOneBy(Repair, { id })
  console.log("Repair: ", singleRepair);
};

export const editRepair = async (id: number, repair: Partial<Repair>) => {
  console.log(`Editing repair - ${id} from the database...`);
  const updatedRepair = await AppDataSource.manager.update(
    Repair,
    { id },
    repair
  );
  console.log("Updated Repair: ", updatedRepair);
};

export const deleteRepair = async (id: number) => {
  console.log(`Removing repair - ${id} from the database...`);
  const repair = await AppDataSource.manager.delete(Repair, { id });
  console.log("Removed Repair: ", repair);
};
