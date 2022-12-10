import { AppDataSource } from "../data-source";
import { Shipment } from "../entity/Shipment";
import { getCustomer } from "./Customer";

export const createShipment = async (shipment: Partial<Shipment>) => {
  console.log("Get Customer:");
  const customer = await getCustomer(1);

  console.log("Inserting a new shipment into the database...");
  const shipmentRepo = AppDataSource.getRepository(Shipment);
  shipment.customer = customer;
  const savedShipment = await shipmentRepo.save(shipment);
  console.log("Saved a new shipment with id: " + savedShipment.id);
  return savedShipment.id;
};

export const listShipments = async () => {
  console.log("Loading Shipment from the database...");
  const shipments = await AppDataSource.manager.find(Shipment);
  console.log("Loaded Shipment: ", shipments);
  return shipments;
};

export const getShipment = async (id: number) => {
  console.log(`Getting shipment - ${id} from the database...`);
  const singleShipment = await AppDataSource.manager.findOneBy(Shipment, {
    id,
  });
  console.log("Shipment: ", singleShipment);
  return singleShipment;
};

export const editShipment = async (id: number, shipment: Partial<Shipment>) => {
  console.log(`Editing shipment - ${id} from the database...`);
  const updatedShipment = await AppDataSource.manager.update(
    Shipment,
    { id },
    shipment
  );
  console.log("Updated Shipment: ", updatedShipment);
  return updatedShipment;
};

export const deleteShipment = async (id: number) => {
  console.log(`Removing shipment - ${id} from the database...`);
  const deletedShipment = await AppDataSource.manager.delete(Shipment, { id });
  console.log("Removed Shipment: ", deletedShipment);
  return deletedShipment;
};
