import { ROUTES } from "@/lib/constants/routes";
import { ModifiedLink } from "@/lib/store/slices/linksSlice";
import { httpClient } from "@/lib/utils/httpClient";
import { Link, LinkAnalytics } from "@prisma/client";
import { AnalyticsData } from "../components/types";

export const getLinks = async () => {
  return httpClient.get<Link[]>(ROUTES.links.href).then(res => res.data);
}

export const addLink = async () => {
  return httpClient.post<Link>(ROUTES.links.href).then(res => res.data);
}

export const deleteLink = async (linkId: string, showModal: boolean) => {
  return httpClient.delete<Link>(`${ROUTES.links.href}/${linkId}?showModal=${showModal}`).then(res => res.data);
}

export const editLinks = async (links: ModifiedLink[]) => {
  return httpClient.put<Link[]>(ROUTES.links.href, links).then(res => res.data);
}

export const getLinkAnalytics = async () => {
  return httpClient.get<AnalyticsData[]>(ROUTES.links.analytics.href).then(res => res.data);
}

export const addLinkAnalytics = async (linkId: string) => {
  return httpClient.post<LinkAnalytics>(`${ROUTES.links.href}/${linkId}/analytics`).then(res => res.data);
}