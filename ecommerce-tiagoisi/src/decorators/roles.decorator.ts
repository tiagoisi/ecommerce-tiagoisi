import { SetMetadata } from "@nestjs/common";
import { Role } from "src/auth/roles.enum";

                   //* ...args => se usa por convencion
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);