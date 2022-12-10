import { brand } from "./constants/Brand";
import { role } from "./constants/Role";
import { AppDataSource } from "./data-source";
import {
  createBrand,
  deleteBrand,
  editBrand,
  getBrand,
  listBrands,
} from "./services/Brand";
import { createRole } from "./services/Role";

AppDataSource.initialize()
  .then(async () => {
    const id = await createRole(role);
    await listBrands();
    await editBrand(id, { name: "Kevin" });
    await getBrand(id);
    await deleteBrand(id);
    await listBrands();
  })
  .catch((error) => console.log(error));
