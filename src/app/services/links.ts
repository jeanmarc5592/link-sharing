import { httpClient } from "@/lib/utils/httpClient";
import { Link } from "@prisma/client";

export const getLinks = async () => {
  return httpClient.get<Link[]>('/links').then(res => res.data);
}

export const addLink = async () => {
  return httpClient.post<Link>('/links').then(res => res.data);
}

export const deleteLink = async (linkId: string) => {
  return httpClient.delete<Link>(`/links/${linkId}`).then(res => res.data);
}