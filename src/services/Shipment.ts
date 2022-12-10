import { AppDataSource } from "../data-source";
import { Role } from "../entity";
import { Shipment } from "../entity/Shipment";

export const createShipment = async (shipment: Partial<Shipment>, role_id: number) => {
  console.log("Get Role:");
  const role = await AppDataSource.manager.findOneBy(Role, { id: role_id });

  console.log("Inserting a new shipment into the database...");
  const shipmentRepo = AppDataSource.getRepository(Shipment);
  shipment.role = role
  await shipmentRepo.save(shipment);
  console.log("Saved a new shipment with id: " + shipment.id);
  return shipment.id;
};

export const listShipments = async () => {
  console.log("Loading Shipment from the database...");
  const shipments = await AppDataSource.manager.find(Shipment);
  console.log("Loaded Shipment: ", shipments);
};

export const getShipment = async (id: number) => {
  console.log(`Getting shipment - ${id} from the database...`);
  const singleShipment = await AppDataSource.manager.findOneBy(Shipment, { id })
  console.log("Shipment: ", singleShipment);
};

export const editShipment = async (id: number, shipment: Partial<Shipment>) => {
  console.log(`Editing shipment - ${id} from the database...`);
  const updatedShipment = await AppDataSource.manager.update(
    Shipment,
    { id },
    shipment
  );
  console.log("Updated Shipment: ", updatedShipment);
};

export const deleteShipment = async (id: number) => {
  console.log(`Removing shipment - ${id} from the database...`);
  const shipment = await AppDataSource.manager.delete(Shipment, { id });
  console.log("Removed Shipment: ", shipment);
};
