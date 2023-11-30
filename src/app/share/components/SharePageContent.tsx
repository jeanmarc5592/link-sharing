"use client"

import { getUser } from "@/app/services/users";
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

  const profile = getUserQuery.data;

  useEffect(() => {
    if (getUserQuery.error) {
      toast.error("Something went wrong fetching the data. Check your URL and try again.");
    }
  }, [getUserQuery.error]);

  return (
    <>
      {getUserQuery.isLoading  ? (
        <ProfileCardSkeleton />
      ) : (
        <ProfileCard 
          firstName={profile?.firstName || undefined} 
          lastName={profile?.lastName || undefined} 
          picture={profile?.picture || undefined}
          email={profile?.email || undefined}
          links={[]}
        />
      )}
    </>
  )
}

export default SharePageContent
