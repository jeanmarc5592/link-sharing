"use client"

import LinkButton from "@/app/common/components/LinkButton";
import Typography from "@/app/common/components/Typography";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/20/solid";
import { Link } from "@prisma/client";
import ProfileCardImage from "./ProfileCardImage";

interface ProfileCardProps {
  picture?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  links?: Link[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({ picture, firstName, lastName, email, links }) => {
  return (
    <div className="w-fit mx-auto mt-10 p-4 min-w-[350px] sm:p-10 sm:mt-0 sm:bg-white sm:rounded-lg sm:shadow-lg sm:absolute sm:left-1/2 sm:top-[18%] sm:-translate-x-1/2">
      <div className="flex flex-col items-center">
        <ProfileCardImage picture={picture} />

        <Typography variant="Heading M" className="mb-2 text-center">{firstName} {lastName}</Typography>
        <Typography className="mb-10 text-center">{email}</Typography>

        {links?.map((link) => {
          return <LinkButton key={link.id} link={link} />
        })}
      </div>
    </div>
  )
}

export default ProfileCard
