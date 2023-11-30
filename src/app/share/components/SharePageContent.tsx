"use client"

import { getLinksForUser, getUser } from "@/app/services/users";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation"
import { toast } from "react-toastify";
import ProfileCard from "./ProfileCard";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import { useEffect } from "react";

const SharePageContent = () => {
  const params = useSearchParams();
  const userId = params.get("user");

  const getUserQuery = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
  });

  const getLinksQuery = useQuery({
    queryKey: ["links", userId],
    queryFn: () => getLinksForUser(userId),
  });

  useEffect(() => {
    if (getUserQuery.error || getLinksQuery.error) {
      toast.error("Something went wrong fetching your data. Check your URL and try again.");
    }
  }, [getUserQuery.error, getLinksQuery.error]);

  const profile = getUserQuery.data;
  const links = getLinksQuery.data;

  return (
    <>
      {getUserQuery.isLoading && getLinksQuery.isLoading ? (
        <ProfileCardSkeleton />
      ) : (
        <ProfileCard 
          firstName={profile?.firstName || undefined} 
          lastName={profile?.lastName || undefined} 
          picture={profile?.picture || undefined}
          email={profile?.email || undefined}
          links={links}
        />
      )}
    </>
  )
}

export default SharePageContent
