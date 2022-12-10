import { AppDataSource } from "../data-source";
import { Truck } from "../entity/Truck";
import { getBrand } from "./Brand";

export const createTruck = async (truck: Partial<Truck>) => {
  console.log("Get Brand:");
  const brand = await getBrand(1);

  console.log("Inserting a new truck into the database...");
  const truckRepo = AppDataSource.getRepository(Truck);
  truck.brand = brand;
  const savedTruck = await truckRepo.save(truck);
  console.log("Saved a new Truck with id: " + savedTruck.id);
  return savedTruck.id;
};

export const listTrucks = async () => {
  console.log("Loading Trucks from the database...");
  const trucks = await AppDataSource.manager.find(Truck);
  console.log("Loaded Trucks: ", trucks);
  return trucks;
};

export const getTruck = async (id: number) => {
  console.log(`Getting truck - ${id} from the database...`);
  const singleTruck = await AppDataSource.manager.findOneBy(Truck, { id });
  console.log("Truck: ", singleTruck);
  return singleTruck;
};

export const editTruck = async (id: number, truck: Partial<Truck>) => {
  console.log(`Editing truck - ${id} from the database...`);
  const updatedTruck = await AppDataSource.manager.update(Truck, { id }, truck);
  console.log("Updated Truck: ", updatedTruck);
  return updatedTruck;
};

export const deleteTruck = async (id: number) => {
  console.log(`Removing truck - ${id} from the database...`);
  const deletedTruck = await AppDataSource.manager.delete(Truck, { id });
  console.log("Removed Truck: ", deletedTruck);
  return deletedTruck;
};
