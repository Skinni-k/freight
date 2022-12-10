import { AppDataSource } from "../data-source";
import { Role } from "../entity";
import { Truck } from "../entity/Truck";

export const createTruck = async (truck: Partial<Truck>, role_id: number) => {
  console.log("Get Role:");
  const role = await AppDataSource.manager.findOneBy(Role, { id: role_id });

  console.log("Inserting a new truck into the database...");
  const truckRepo = AppDataSource.getRepository(Truck);
  truck.role = role
  await truckRepo.save(truck);
  console.log("Saved a new truck with id: " + truck.id);
  return truck.id;
};

export const listTrucks = async () => {
  console.log("Loading Trucks from the database...");
  const trucks = await AppDataSource.manager.find(Truck);
  console.log("Loaded Trucks: ", trucks);
};

export const getTruck = async (id: number) => {
  console.log(`Getting truck - ${id} from the database...`);
  const singleTruck = await AppDataSource.manager.findOneBy(Truck, { id })
  console.log("Truck: ", singleTruck);
};

export const editTruck = async (id: number, truck: Partial<Truck>) => {
  console.log(`Editing truck - ${id} from the database...`);
  const updatedTruck = await AppDataSource.manager.update(
    Truck,
    { id },
    truck
  );
  console.log("Updated Truck: ", updatedTruck);
};

export const deleteTruck = async (id: number) => {
  console.log(`Removing truck - ${id} from the database...`);
  const truck = await AppDataSource.manager.delete(Truck, { id });
  console.log("Removed Truck: ", truck);
};
