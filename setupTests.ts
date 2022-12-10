import "reflect-metadata";
import { afterEach, beforeAll, beforeEach } from "vitest";
import { AppDataSource } from "./src/data-source";
import { Brand, Customer, Employee, Repair, Role, Shipment, Trip, Truck } from "./src/entity";

beforeAll(async () => {
  //await AppDataSource.initialize(); // Unit tests fail
  // await AppDataSource.manager.remove(Trip);
  // await AppDataSource.manager.remove(Shipment);
  // await AppDataSource.manager.remove(Customer);
  // await AppDataSource.manager.remove(Repair);
  // await AppDataSource.manager.remove(Employee);
  // await AppDataSource.manager.remove(Truck);
  // await AppDataSource.manager.remove(Role);
  // await AppDataSource.manager.remove(Brand);
});

beforeEach(async () => {});
