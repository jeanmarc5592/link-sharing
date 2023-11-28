"use client"

import LinkButton from "@/app/common/components/LinkButton";
import Typography from "@/app/common/components/Typography";
import { getLinks } from "@/app/services/links";
import { getMe } from "@/app/services/users";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const ProfileCard = () => {
  const { data: profile } = useQuery({
    queryKey: ['users'],
    queryFn: getMe
  });

  const { data: links } = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  });

  if (!profile || !links) {
    return <></>;
  }

  return (
    <div className="w-fit mx-auto mt-10 p-4 sm:p-10 sm:mt-0 sm:bg-white sm:rounded-lg sm:shadow-lg sm:absolute sm:left-1/2 sm:top-[18%] sm:-translate-x-1/2">
      <div className="flex flex-col items-center">
        <Image 
          loading="lazy" 
          src={profile.picture || ""} 
          width={104} 
          height={104} 
          alt="Profile Image" 
          className="rounded-full mb-6 border-2 border-custom-purple max-h-[100%]" 
        />

        <Typography variant="Heading M" className="mb-2 text-center">{profile.firstName} {profile.lastName}</Typography>
        <Typography className="mb-10 text-center">{profile.email}</Typography>

        {links.map((link) => {
          return <LinkButton key={link.id} link={link} />
        })}
      </div>
    </div>
  )
}

export default ProfileCard
