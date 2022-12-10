import { describe, expect, it, vi } from "vitest";
import { brand } from "../constants/Brand";
import {
  createBrand,
  deleteBrand,
  editBrand,
  getBrand,
  listBrands,
} from "./Brand";

describe.skip("Brand Integration CRUD", () => {
  it("creates a brand entry", async () => {
    const brands = await listBrands();
    const id = await createBrand(brand);
    expect(id).toEqual(brands.length);
    expect(id).not.toEqual(5);
  });

  it("Lists brands", async () => {
    const brands = await listBrands();
    expect(brands).toEqual([{ id: 1, name: "Mercedes" }]); //might fail due to length from previous test
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
    const brands = await deleteBrand(1);
    expect(brands).toEqual({ id: 1, name: "Mercedes" });
    expect(brands).not.toEqual({ id: 2, name: "BMW" });
    expect(brands).not.toEqual(5);
  });
});
