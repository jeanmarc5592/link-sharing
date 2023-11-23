import { httpClient } from "@/lib/utils/httpClient"
import { User } from "@prisma/client";
import { UserUpdates } from "./types";

export const getMe = async () => {
  return httpClient.get<User>('/users/me').then(res => res.data);
}

export const updateMe = async (updates: UserUpdates) => {
  return httpClient.patch<User>('/users/me', updates).then(res => res.data);
}