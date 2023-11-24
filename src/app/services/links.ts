import { ROUTES } from "@/lib/constants/routes";
import { ModifiedLink } from "@/lib/store/slices/linksSlice";
import { httpClient } from "@/lib/utils/httpClient";
import { Link } from "@prisma/client";

export const getLinks = async () => {
  return httpClient.get<Link[]>(ROUTES.links.href).then(res => res.data);
}

export const addLink = async () => {
  return httpClient.post<Link>(ROUTES.links.href).then(res => res.data);
}

export const deleteLink = async (linkId: string) => {
  return httpClient.delete<Link>(`${ROUTES.links.href}/${linkId}`).then(res => res.data);
}

export const editLinks = async (links: ModifiedLink[]) => {
  return httpClient.put<Link[]>(ROUTES.links.href, links).then(res => res.data);
}