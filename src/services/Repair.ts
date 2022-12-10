import { AppDataSource } from "../data-source";
import { Repair } from "../entity/Repair";
import { getEmployee } from "./Employee";
import { getTruck } from "./Truck";

export const createRepair = async (repair: Partial<Repair>) => {
  console.log("Get Truck:");
  const truck = await getTruck(1);

  console.log("Get Employee:");
  const employee = await getEmployee(1);

  console.log("Inserting a new repair into the database...");
  const repairRepo = AppDataSource.getRepository(Repair);
  repair.truck = truck;
  repair.mechanic = employee;

  const savedRepair = await repairRepo.save(repair);
  console.log("Saved a new repair with id: " + savedRepair.id);
  return savedRepair.id;
};

export const listRepairs = async () => {
  console.log("Loading Repair from the database...");
  const repairs = await AppDataSource.manager.find(Repair);
  console.log("Loaded Repair: ", repairs);
  return repairs;
};

export const getRepair = async (id: number) => {
  console.log(`Getting repair - ${id} from the database...`);
  const singleRepair = await AppDataSource.manager.findOneBy(Repair, { id });
  console.log("Repair: ", singleRepair);
  return singleRepair;
};

export const editRepair = async (id: number, repair: Partial<Repair>) => {
  console.log(`Editing repair - ${id} from the database...`);
  const updatedRepair = await AppDataSource.manager.update(
    Repair,
    { id },
    repair
  );
  console.log("Updated Repair: ", updatedRepair);
  return updatedRepair;
};

export const deleteRepair = async (id: number) => {
  console.log(`Removing repair - ${id} from the database...`);
  const deletedRepair = await AppDataSource.manager.delete(Repair, { id });
  console.log("Removed Repair: ", deletedRepair);
  return deletedRepair;
};
