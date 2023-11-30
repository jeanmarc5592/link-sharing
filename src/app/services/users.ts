import { httpClient } from "@/lib/utils/httpClient"
import { User } from "@prisma/client";
import { UserUpdates } from "./types";
import { ROUTES } from "@/lib/constants/routes";

export const getMe = async () => {
  return httpClient.get<User>(ROUTES.users.me.href).then(res => res.data);
}

export const updateMe = async (updates: Partial<User>) => {
  return httpClient.patch<User>(ROUTES.users.me.href, updates).then(res => res.data);
}

export const getUser = async (id: string | null) => {
  return httpClient.get<User>(`${ROUTES.users.href}/${id}`).then(res => res.data);
}