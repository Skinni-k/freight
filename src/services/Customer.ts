import { AppDataSource } from "../data-source";
import { Role } from "../entity";
import { Customer } from "../entity/Customer";

export const createCustomer = async (customer: Partial<Customer>, role_id: number) => {
  console.log("Get Role:");
  const role = await AppDataSource.manager.findOneBy(Role, { id: role_id });

  console.log("Inserting a new customer into the database...");
  const customerRepo = AppDataSource.getRepository(Customer);
  customer.role = role
  await customerRepo.save(customer);
  console.log("Saved a new customer with id: " + customer.id);
  return customer.id;
};

export const listCustomers = async () => {
  console.log("Loading Customer from the database...");
  const customers = await AppDataSource.manager.find(Customer);
  console.log("Loaded Customer: ", customers);
};

export const getCustomer = async (id: number) => {
  console.log(`Getting customer - ${id} from the database...`);
  const singleCustomer = await AppDataSource.manager.findOneBy(Customer, { id })
  console.log("Customer: ", singleCustomer);
};

export const editCustomer = async (id: number, customer: Partial<Customer>) => {
  console.log(`Editing customer - ${id} from the database...`);
  const updatedCustomer = await AppDataSource.manager.update(
    Customer,
    { id },
    customer
  );
  console.log("Updated Customer: ", updatedCustomer);
};

export const deleteCustomer = async (id: number) => {
  console.log(`Removing customer - ${id} from the database...`);
  const customer = await AppDataSource.manager.delete(Customer, { id });
  console.log("Removed Customer: ", customer);
};
