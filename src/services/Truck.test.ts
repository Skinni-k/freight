import { describe, expect, it, vi } from "vitest";
import { AppDataSource } from "../data-source";
import { truck } from "../constants/Truck";
import {
  createTruck,
  deleteTruck,
  editTruck,
  getTruck,
  listTrucks,
} from "./Truck";

const truckInfo = {
  load: 1,
  capacity: 1,
  year: 2021,
  number_of_Repair: 5,
  id: 1,
  brandId: 1,
};

const brandInfo = {
  id: 1,
  name: "Mercedes",
};

AppDataSource.getRepository = vi.fn().mockReturnValue({
  save: vi.fn().mockResolvedValueOnce(truckInfo),
});

AppDataSource.manager.find = vi.fn().mockReturnValue([truckInfo]);

AppDataSource.manager.findOneBy = vi
  .fn()
  .mockReturnValueOnce(brandInfo)
  .mockReturnValueOnce(truckInfo);

AppDataSource.manager.update = vi
  .fn()
  .mockReturnValue({ ...truckInfo, number_of_Repair: 10 });

AppDataSource.manager.delete = vi.fn().mockReturnValue(truckInfo);

describe("Truck CRUD", () => {
  it("Creates a truck entry", async () => {
    const id = await createTruck(truck);
    console.log("Logged", {
      id,
      truck,
    });
    expect(id).toEqual(1);
    expect(id).not.toEqual(5);
  });

  it("Lists trucks", async () => {
    const trucks = await listTrucks();
    expect(trucks).toEqual([
      {
        load: 1,
        capacity: 1,
        year: 2021,
        number_of_Repair: 5,
        id: 1,
        brandId: 1,
      },
    ]);
    expect(trucks).not.toEqual([{ ...truck, id: 2 }]);
    expect(trucks).not.toEqual(5);
  });

  it("Gets one truck", async () => {
    const singleTrucks = await getTruck(1);
    expect(singleTrucks).toEqual(truckInfo);
    expect(singleTrucks).not.toEqual({ ...truck, id: 2 });
    expect(singleTrucks).not.toEqual(5);
  });

  it("Edits a truck", async () => {
    const updatedTruck = await editTruck(1, { number_of_Repair: 10 });
    expect(updatedTruck).toEqual({
      load: 1,
      capacity: 1,
      year: 2021,
      id: 1,
      brandId: 1,
      number_of_Repair: 10,
    });
    expect(updatedTruck).not.toEqual({ id: 2, number_of_Repair: 11 });
    expect(updatedTruck).not.toEqual(5);
  });

  it("Delete a truck", async () => {
    const deletedTruck = await deleteTruck(1);
    expect(deletedTruck).toEqual(truckInfo);
    expect(deletedTruck).not.toEqual({ id: 2, number_of_Repair: 11 });
    expect(deletedTruck).not.toEqual(5);
  });
});
