import { User } from "@prisma/client";

export type UserToCreate = Pick<User, "email" | "password" | "googleId" | "githubId" | "firstName" | "lastName" | "picture">;