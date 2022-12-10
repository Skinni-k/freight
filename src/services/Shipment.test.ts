import { describe, expect, it, vi } from "vitest";
import { AppDataSource } from "../data-source";
import { shipment } from "../constants/Shipment";
import {
  createShipment,
  deleteShipment,
  editShipment,
  getShipment,
  listShipments,
} from "./Shipment";

const shipmentInfo = {
  id: 1,
  customerId: 1,
  weight: 1,
  value: 1,
  origin: "Kitchener",
  destination: "Waterloo",
};

AppDataSource.getRepository = vi.fn().mockReturnValue({
  save: vi.fn().mockResolvedValueOnce({ id: 1 }),
});

AppDataSource.manager.find = vi.fn().mockReturnValue([shipmentInfo]);

AppDataSource.manager.findOneBy = vi.fn().mockReturnValue(shipmentInfo);

AppDataSource.manager.update = vi.fn().mockReturnValue({
  ...shipmentInfo,
  origin: "Waterloo",
  destination: "Kitchener",
});

AppDataSource.manager.delete = vi.fn().mockReturnValue(shipmentInfo);

describe("Shipment CRUD", () => {
  it("Creates a shipment entry", async () => {
    const id = await createShipment(shipment);
    expect(id).toEqual(1);
    expect(id).not.toEqual(5);
  });

  it("Lists shipments", async () => {
    const shipments = await listShipments();
    expect(shipments).toEqual([
      {
        id: 1,
        customerId: 1,
        weight: 1,
        value: 1,
        origin: "Kitchener",
        destination: "Waterloo",
      },
    ]);
    expect(shipments).not.toEqual([{ ...shipment, id: 2 }]);
    expect(shipments).not.toEqual(5);
  });

  it("Gets one shipment", async () => {
    const shipments = await getShipment(1);
    expect(shipments).toEqual(shipmentInfo);
    expect(shipments).not.toEqual({ ...shipment, id: 2 });
    expect(shipments).not.toEqual(5);
  });

  it("Edits a shipment", async () => {
    const shipments = await editShipment(1, {
      origin: "Waterloo",
      destination: "Kitchener",
    });
    expect(shipments).toEqual({
      id: 1,
      customerId: 1,
      weight: 1,
      value: 1,
      origin: "Waterloo",
      destination: "Kitchener",
    });
    expect(shipments).not.toEqual({ id: 2, name: "Mercedes" });
    expect(shipments).not.toEqual(5);
  });

  it("Delete a shipment", async () => {
    const shipments = await deleteShipment(1);
    expect(shipments).toEqual(shipmentInfo);
    expect(shipments).not.toEqual({ id: 2, origin: "Waterloo" });
    expect(shipments).not.toEqual(5);
  });
});
