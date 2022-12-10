import { AppDataSource } from "../data-source";
import { Role } from "../entity";
import { Trip } from "../entity/Trip";

export const createTrip = async (trip: Partial<Trip>, role_id: number) => {
  console.log("Get Role:");
  const role = await AppDataSource.manager.findOneBy(Role, { id: role_id });

  console.log("Inserting a new trip into the database...");
  const tripRepo = AppDataSource.getRepository(Trip);
  trip.role = role
  await tripRepo.save(trip);
  console.log("Saved a new trip with id: " + trip.id);
  return trip.id;
};

export const listTrips = async () => {
  console.log("Loading Trip from the database...");
  const trips = await AppDataSource.manager.find(Trip);
  console.log("Loaded Trip: ", trips);
};

export const getTrip = async (id: number) => {
  console.log(`Getting trip - ${id} from the database...`);
  const singleTrip = await AppDataSource.manager.findOneBy(Trip, { id })
  console.log("Trip: ", singleTrip);
};

export const editTrip = async (id: number, trip: Partial<Trip>) => {
  console.log(`Editing trip - ${id} from the database...`);
  const updatedTrip = await AppDataSource.manager.update(
    Trip,
    { id },
    trip
  );
  console.log("Updated Trip: ", updatedTrip);
};

export const deleteTrip = async (id: number) => {
  console.log(`Removing trip - ${id} from the database...`);
  const trip = await AppDataSource.manager.delete(Trip, { id });
  console.log("Removed Trip: ", trip);
};
