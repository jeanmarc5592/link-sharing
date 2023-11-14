import { httpClient } from "@/lib/utils/httpClient";
import { Link } from "@prisma/client";

export const getLinks = () => {
  return httpClient.get<Link[]>('/links').then(res => res.data);
}