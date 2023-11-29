"use client"

import LinkButton from "@/app/common/components/LinkButton";
import Typography from "@/app/common/components/Typography";
import { getLinks } from "@/app/services/links";
import { getMe } from "@/app/services/users";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import { UserIcon } from "@heroicons/react/20/solid";

const ProfileCard = () => {
  const getMeQuery = useQuery({
    queryKey: ['users'],
    queryFn: getMe
  });

  const getLinksQuery = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  });

  const { data: profile } = getMeQuery;
  const { data: links } = getLinksQuery;

  if (getMeQuery.isLoading && getLinksQuery.isLoading) {
    return <ProfileCardSkeleton />;
  }

  return (
    <div className="w-fit mx-auto mt-10 p-4 min-w-[350px] sm:p-10 sm:mt-0 sm:bg-white sm:rounded-lg sm:shadow-lg sm:absolute sm:left-1/2 sm:top-[18%] sm:-translate-x-1/2">
      <div className="flex flex-col items-center">
        <div className="w-[104px] h-[104px] max-h-[104px] rounded-full border-[3px] border-custom-purple overflow-hidden mb-6">
          {profile?.picture ? (
            <Image 
              loading="lazy" 
              src={profile.picture} 
              width={104} 
              height={104} 
              alt="Profile Image" 
              className="max-h-[100%] object-cover" 
            />
          ) : (
            <div className="bg-custom-gray-lighter h-[100%] w-[100%] flex justify-center items-center">
              <UserIcon color="white" className="w-[64px] h-[64px]" />
            </div>
          )}
        </div>

        <Typography variant="Heading M" className="mb-2 text-center">{profile?.firstName} {profile?.lastName}</Typography>
        <Typography className="mb-10 text-center">{profile?.email}</Typography>

        {links?.map((link) => {
          return <LinkButton key={link.id} link={link} />
        })}
      </div>
    </div>
  )
}

export default ProfileCard
