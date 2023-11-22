import { httpClient } from "@/lib/utils/httpClient"
import { User } from "@prisma/client";

export const getMe = async () => {
  return httpClient.get<User>('/users/me').then(res => res.data);
}