import { describe, expect, it, vi } from "vitest";
import { AppDataSource } from "../data-source";
import { repair } from "../constants/Repair";
import {
  createRepair,
  deleteRepair,
  editRepair,
  getRepair,
  listRepairs,
} from "./Repair";

const repairInfo = {
  id: 1,
  truckId: 1,
  mechanic: 1,
  estimated_days: 1,
};

const truckInfo = {
  load: 1,
  capacity: 1,
  year: 2021,
  number_of_Repair: 5,
  id: 1,
  brandId: 1,
};

const mechanicInfo = {
  id: 1,
  roleId: 1,
  name: "Kevin",
  surname: "Dewinter",
  seniority: "Manager",
};

const brandInfo = {
  id: 1,
  name: "Mercedes",
};

AppDataSource.getRepository = vi.fn().mockReturnValue({
  save: vi.fn().mockResolvedValueOnce(repairInfo),
});

AppDataSource.manager.find = vi.fn().mockReturnValue([repairInfo]);

AppDataSource.manager.findOneBy = vi
  .fn()
  .mockReturnValueOnce(mechanicInfo)
  .mockReturnValueOnce(brandInfo)
  .mockReturnValueOnce(repairInfo)
  .mockReturnValueOnce(truckInfo);

AppDataSource.manager.update = vi
  .fn()
  .mockReturnValue({ ...repairInfo, estimated_days: 10 });

AppDataSource.manager.delete = vi.fn().mockReturnValue(repairInfo);

describe("Repair CRUD", () => {
  it("Creates a repair entry", async () => {
    const id = await createRepair(repair);
    expect(id).toEqual(1);
    expect(id).not.toEqual(5);
  });

  it("Lists repairs", async () => {
    const repairs = await listRepairs();
    expect(repairs).toEqual([
      {
        id: 1,
        truckId: 1,
        mechanic: 1,
        estimated_days: 1,
      },
    ]);
    expect(repairs).not.toEqual([{ ...repair, id: 2 }]);
    expect(repairs).not.toEqual(5);
  });

  it("Gets one repair", async () => {
    const singleRepair = await getRepair(1);
    expect(singleRepair).toEqual(repairInfo);
    expect(singleRepair).not.toEqual({ ...repair, id: 2 });
    expect(singleRepair).not.toEqual(5);
  });

  it("Edits a repair", async () => {
    const updatedRepair = await editRepair(1, { estimated_days: 10 });
    expect(updatedRepair).toEqual({
      id: 1,
      truckId: 1,
      mechanic: 1,
      estimated_days: 10,
    });
    expect(updatedRepair).not.toEqual({ id: 2, estimated_days: 1 });
    expect(updatedRepair).not.toEqual(5);
  });

  it("Delete a repair", async () => {
    const deletedRepair = await deleteRepair(1);
    expect(deletedRepair).toEqual(repairInfo);
    expect(deletedRepair).not.toEqual({ id: 2, mechanic: 10 });
    expect(deletedRepair).not.toEqual(5);
  });
});
