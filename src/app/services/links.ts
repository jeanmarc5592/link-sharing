import { httpClient } from "@/lib/utils/httpClient";
import { Link } from "@prisma/client";

export const getLinks = async () => {
  return httpClient.get<Link[]>('/links').then(res => res.data);
}

export const addLink = async () => {
  return httpClient.post<Link>('/links').then(res => res.data);
}