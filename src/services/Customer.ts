import { AppDataSource } from "../data-source";
import { Customer } from "../entity/Customer";
import { getShipment } from "./Shipment";

export const createCustomer = async (customer: Partial<Customer>) => {
  console.log("Get Shipment:");
  const shipment = await getShipment(1);

  console.log("Inserting a new customer into the database...");
  const customerRepo = AppDataSource.getRepository(Customer);
  customer.shipment = [shipment];
  const savedCustomer = await customerRepo.save(customer);
  console.log("Saved a new customer with id: " + savedCustomer.id);
  return savedCustomer.id;
};

export const listCustomers = async () => {
  console.log("Loading Customer from the database...");
  const customers = await AppDataSource.manager.find(Customer);
  console.log("Loaded Customer: ", customers);
  return customers;
};

export const getCustomer = async (id: number) => {
  console.log(`Getting customer - ${id} from the database...`);
  const singleCustomer = await AppDataSource.manager.findOneBy(Customer, {
    id,
  });
  console.log("Customer: ", singleCustomer);
  return singleCustomer;
};

export const editCustomer = async (id: number, customer: Partial<Customer>) => {
  console.log(`Editing customer - ${id} from the database...`);
  const updatedCustomer = await AppDataSource.manager.update(
    Customer,
    { id },
    customer
  );
  console.log("Updated Customer: ", updatedCustomer);
  return updatedCustomer;
};

export const deleteCustomer = async (id: number) => {
  console.log(`Removing customer - ${id} from the database...`);
  const deletedCustomer = await AppDataSource.manager.delete(Customer, { id });
  console.log("Removed Customer: ", deletedCustomer);
  return deletedCustomer;
};
