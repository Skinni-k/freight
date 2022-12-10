import { AppDataSource } from "../data-source";
import { Trip } from "../entity/Trip";
import { getEmployee } from "./Employee";
import { getShipment } from "./Shipment";
import { getTruck } from "./Truck";

export const createTrip = async (trip: Partial<Trip>) => {
  console.log("Get Truck:");
  const truck = await getTruck(1);

  console.log("Get Employee:");
  const employee = await getEmployee(1);

  console.log("Get Shipment:");
  const shipment = await getShipment(1);

  console.log("Inserting a new trip into the database...");
  const tripRepo = AppDataSource.getRepository(Trip);
  trip.truck = truck;
  trip.employee = employee;
  trip.shipment = shipment;
  const savedTrip = await tripRepo.save(trip);
  console.log("Saved a new trip with id: " + savedTrip.id);
  return savedTrip.id;
};

export const listTrips = async () => {
  console.log("Loading Trip from the database...");
  const trips = await AppDataSource.manager.find(Trip);
  console.log("Loaded Trip: ", trips);
  return trips;
};

export const getTrip = async (id: number) => {
  console.log(`Getting trip - ${id} from the database...`);
  const singleTrip = await AppDataSource.manager.findOneBy(Trip, { id });
  console.log("Trip: ", singleTrip);
  return singleTrip;
};

export const editTrip = async (id: number, trip: Partial<Trip>) => {
  console.log(`Editing trip - ${id} from the database...`);
  const updatedTrip = await AppDataSource.manager.update(Trip, { id }, trip);
  console.log("Updated Trip: ", updatedTrip);
  return updatedTrip;
};

export const deleteTrip = async (id: number) => {
  console.log(`Removing trip - ${id} from the database...`);
  const deletedTrip = await AppDataSource.manager.delete(Trip, { id });
  console.log("Removed Trip: ", deletedTrip);
  return deletedTrip;
};
