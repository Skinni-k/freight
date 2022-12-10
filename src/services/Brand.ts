import { AppDataSource } from "../data-source";
import { Brand } from "../entity/Brand";

export const createBrand = async (brand: Partial<Brand>) => {
  console.log("Inserting a new brand into the database...");
  const brandRepo = AppDataSource.getRepository(Brand);
  const savedBrand = await brandRepo.save(brand);
  console.log("Saved a new brand with id: " + savedBrand.id);
  return savedBrand.id;
};

export const listBrands = async () => {
  console.log("Loading Brand from the database...");
  const brands = await AppDataSource.manager.find(Brand);
  console.log("Loaded Brand: ", brands);
  return brands
};

export const getBrand = async (id: number) => {
  console.log(`Getting brand - ${id} from the database...`);
  const singleBrand = await AppDataSource.manager.findOneBy(Brand, { id });
  console.log("Brand: ", singleBrand);
  return singleBrand
};

export const editBrand = async (id: number, brand: Partial<Brand>) => {
  console.log(`Editing brand - ${id} from the database...`);
  const updatedBrand = await AppDataSource.manager.update(Brand, { id }, brand);
  console.log("Updated Brand: ", updatedBrand);
  return updatedBrand
};

export const deleteBrand = async (id: number) => {
  console.log(`Removing brand - ${id} from the database...`);
  const deletedBrand = await AppDataSource.manager.delete(Brand, { id });
  console.log("Removed Brand: ", deletedBrand);
  return deletedBrand
};
