import { describe, expect, it, vi } from "vitest";
import { AppDataSource } from "../data-source";
import { customer } from "../constants/Customer";
import { createCustomer, deleteCustomer, editCustomer, getCustomer, listCustomers } from "./Customer";

AppDataSource.getRepository = vi.fn().mockReturnValue({
  save: vi.fn().mockResolvedValueOnce({ id: 1 }),
});

AppDataSource.manager.find = vi
  .fn()
  .mockReturnValue([{ id: 1, name: "Mercedes" }]);

AppDataSource.manager.findOneBy = vi
  .fn()
  .mockReturnValue({ id: 1, name: "Mercedes" });

AppDataSource.manager.update = vi.fn().mockReturnValue({ id: 1, name: "BMW" });

AppDataSource.manager.delete = vi.fn().mockReturnValue({ id: 1, name: "Mercedes" });

describe("Customer CRUD", () => {
  it("Creates a customer entry", async () => {
    const id = await createCustomer(customer);
    expect(id).toEqual(1);
    expect(id).not.toEqual(5);
  });

  it("Lists customers", async () => {
    const customers = await listCustomers();
    expect(customers).toEqual([{ id: 1, name: "Mercedes" }]);
    expect(customers).not.toEqual([{ ...customer, id: 2 }]);
    expect(customers).not.toEqual(5);
  });

  it("Gets one customer", async () => {
    const customers = await getCustomer(1);
    expect(customers).toEqual({ id: 1, name: "Mercedes" });
    expect(customers).not.toEqual({ ...customer, id: 2 });
    expect(customers).not.toEqual(5);
  });

  it("Edits a customer", async () => {
    const customers = await editCustomer(1, { name: "BMW" });
    expect(customers).toEqual({ id: 1, name: "BMW" });
    expect(customers).not.toEqual({ id: 2, name: "Mercedes" });
    expect(customers).not.toEqual(5);
  });

  it("Delete a customer", async () => {
    const customers = await deleteCustomer(1)
    expect(customers).toEqual({ id: 1, name: "Mercedes" });
    expect(customers).not.toEqual({ id: 2, name: "BMW" });
    expect(customers).not.toEqual(5);
  });
});
