import { describe, expect, it, vi } from "vitest";
import { AppDataSource } from "../data-source";
import { trip } from "../constants/Trip";
import {
  createTrip,
  deleteTrip,
  editTrip,
  getTrip,
  listTrips,
} from "./Trip";

const tripInfo = {
  id: 1,
  truckId: 1,
  employeeId: 1,
  shipmentId: 1,
  origin: "Kitchener",
  destination: "Waterloo",
};

AppDataSource.getRepository = vi.fn().mockReturnValue({
  save: vi.fn().mockResolvedValueOnce({ id: 1 }),
});

AppDataSource.manager.find = vi.fn().mockReturnValue([tripInfo]);

AppDataSource.manager.findOneBy = vi.fn().mockReturnValue(tripInfo);

AppDataSource.manager.update = vi.fn().mockReturnValue({
  ...tripInfo,
  origin: "Waterloo",
  destination: "Kitchener",
});

AppDataSource.manager.delete = vi.fn().mockReturnValue(tripInfo);

describe("Trip CRUD", () => {
  it("Creates a trip entry", async () => {
    const id = await createTrip(trip);
    expect(id).toEqual(1);
    expect(id).not.toEqual(5);
  });

  it("Lists trips", async () => {
    const trips = await listTrips();
    expect(trips).toEqual([
      {
        id: 1,
        truckId: 1,
        employeeId: 1,
        shipmentId: 1,
        origin: "Kitchener",
        destination: "Waterloo",
      },
    ]);
    expect(trips).not.toEqual([{ ...trip, id: 2 }]);
    expect(trips).not.toEqual(5);
  });

  it("Gets one trip", async () => {
    const trips = await getTrip(1);
    expect(trips).toEqual(tripInfo);
    expect(trips).not.toEqual({ ...trip, id: 2 });
    expect(trips).not.toEqual(5);
  });

  it("Edits a trip", async () => {
    const trips = await editTrip(1, {
      origin: "Waterloo",
      destination: "Kitchener",
    });
    expect(trips).toEqual({
      id: 1,
      truckId: 1,
      employeeId: 1,
      shipmentId: 1,
      origin: "Waterloo",
      destination: "Kitchener",
    });
    expect(trips).not.toEqual({ id: 2, name: "Mercedes" });
    expect(trips).not.toEqual(5);
  });

  it("Delete a trip", async () => {
    const trips = await deleteTrip(1);
    expect(trips).toEqual(tripInfo);
    expect(trips).not.toEqual({ id: 2, origin: "Waterloo" });
    expect(trips).not.toEqual(5);
  });
});
