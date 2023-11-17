import { ModifiedLink } from "@/lib/store/slices/linksSlice";
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

export const editLinks = async (links: ModifiedLink[]) => {
  return httpClient.put<Link[]>('/links', links).then(res => res.data);
}