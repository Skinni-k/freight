import { AppDataSource } from "../data-source";
import { Role } from "../entity";
import { Brand } from "../entity/Brand";

export const createBrand = async (brand: Partial<Brand>, role_id: number) => {
  console.log("Get Role:");
  const role = await AppDataSource.manager.findOneBy(Role, { id: role_id });

  console.log("Inserting a new brand into the database...");
  const brandRepo = AppDataSource.getRepository(Brand);
  brand.role = role
  await brandRepo.save(brand);
  console.log("Saved a new brand with id: " + brand.id);
  return brand.id;
};

export const listBrands = async () => {
  console.log("Loading Brand from the database...");
  const brands = await AppDataSource.manager.find(Brand);
  console.log("Loaded Brand: ", brands);
};

export const getBrand = async (id: number) => {
  console.log(`Getting brand - ${id} from the database...`);
  const singleBrand = await AppDataSource.manager.findOneBy(Brand, { id })
  console.log("Brand: ", singleBrand);
};

export const editBrand = async (id: number, brand: Partial<Brand>) => {
  console.log(`Editing brand - ${id} from the database...`);
  const updatedBrand = await AppDataSource.manager.update(
    Brand,
    { id },
    brand
  );
  console.log("Updated Brand: ", updatedBrand);
};

export const deleteBrand = async (id: number) => {
  console.log(`Removing brand - ${id} from the database...`);
  const brand = await AppDataSource.manager.delete(Brand, { id });
  console.log("Removed Brand: ", brand);
};
