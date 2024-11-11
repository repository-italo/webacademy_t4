import { User } from "@prisma/client";

type SignUpDTO = Pick<User, "firstName" | "lastName" | "email" | "password" >;
type LoginDTO = Pick<User, "email" | "password">;
export {SignUpDTO, LoginDTO};