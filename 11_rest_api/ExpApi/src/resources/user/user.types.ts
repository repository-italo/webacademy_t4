import { User } from "@prisma/client"

export type CreateUserDTO = Required<Pick<User, "firsName" | "lastName" | "email" | "password" | "userTypeId">>;