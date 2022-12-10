import { describe, expect, it, vi } from "vitest";
import { role } from "../constants/Role";
import { createRole } from "./Role";

describe("Role Integration CRUD", () => {

  it.skip("creates a role entry", async () => {
    const id = await createRole(role);
    expect(id).toEqual(1);
    expect(id).not.toEqual(5);
  });  
});
