import { describe, expect, it, vi } from "vitest";
import { AppDataSource } from "../data-source";
import { brand } from "../constants/Brand";
import { createBrand, deleteBrand, editBrand, getBrand, listBrands } from "./Brand";

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

describe("Brand CRUD", () => {
  it("Creates a brand entry", async () => {
    const id = await createBrand(brand);
    expect(id).toEqual(1);
    expect(id).not.toEqual(5);
  });

  it("Lists brands", async () => {
    const brands = await listBrands();
    expect(brands).toEqual([{ id: 1, name: "Mercedes" }]);
    expect(brands).not.toEqual([{ ...brand, id: 2 }]);
    expect(brands).not.toEqual(5);
  });

  it("Gets one brand", async () => {
    const brands = await getBrand(1);
    expect(brands).toEqual({ id: 1, name: "Mercedes" });
    expect(brands).not.toEqual({ ...brand, id: 2 });
    expect(brands).not.toEqual(5);
  });

  it("Edits a brand", async () => {
    const brands = await editBrand(1, { name: "BMW" });
    expect(brands).toEqual({ id: 1, name: "BMW" });
    expect(brands).not.toEqual({ id: 2, name: "Mercedes" });
    expect(brands).not.toEqual(5);
  });

  it("Delete a brand", async () => {
    const brands = await deleteBrand(1)
    expect(brands).toEqual({ id: 1, name: "Mercedes" });
    expect(brands).not.toEqual({ id: 2, name: "BMW" });
    expect(brands).not.toEqual(5);
  });
});
