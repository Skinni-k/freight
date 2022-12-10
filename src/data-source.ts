import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  Brand,
  Customer,
  Employee,
  Repair,
  Role,
  Shipment,
  Trip,
  Truck,
} from "./entity";
import { DefaultBrands1670650836841 } from "./migration/1670650836841-DefaultBrands";
import { DefaultRole1670650843829 } from "./migration/1670650843829-DefaultRole";
import { DefaultTruck1670650852829 } from "./migration/1670650852829-DefaultTruck";
import { DefaultEmployee1670650861488 } from "./migration/1670650861488-DefaultEmployee";
import { DefaultRepair1670650870898 } from "./migration/1670650870898-DefaultRepair";
import { DefaultCustomer1670650876441 } from "./migration/1670650876441-DefaultCustomer";
import { DefaultShipment1670650883234 } from "./migration/1670650883234-DefaultShipment";
import { DefaultTrip1670650887987 } from "./migration/1670650887987-DefaultTrip";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Brand, Customer, Employee, Repair, Role, Shipment, Trip, Truck],
  migrations: [
    DefaultBrands1670650836841,
    DefaultRole1670650843829,
    DefaultTruck1670650852829,
    DefaultEmployee1670650861488,
    DefaultRepair1670650870898,
    DefaultCustomer1670650876441,
    DefaultShipment1670650883234,
    DefaultTrip1670650887987
  ],
  subscribers: [],
});
