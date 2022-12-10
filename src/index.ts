import { brand } from "./constants/Brand";
import { AppDataSource } from "./data-source";
import {
  createBrand,
  deleteBrand,
  editBrand,
  getBrand,
  listBrands,
} from "./services/Brand";

AppDataSource.initialize()
  .then(async () => {
    const id = await createBrand(brand);
    await listBrands();
    await editBrand(id, { name: "Kevin" });
    await getBrand(id);
    await deleteBrand(id);
    await listBrands();
  })
  .catch((error) => console.log(error));
