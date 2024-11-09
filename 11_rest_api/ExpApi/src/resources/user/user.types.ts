import { User } from "@prisma/client"

export type CreateUserDTO = Pick<User, "firsName" | "lastName" | "email" | "password" | "userTypeId">;
export type UserWithoutId = Omit<User, "id">;