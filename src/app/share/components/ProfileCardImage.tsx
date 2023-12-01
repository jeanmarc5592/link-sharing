import { UserIcon } from "@heroicons/react/20/solid";
import Image from "next/image"

interface ProfileCardImageProps {
  picture?: string;
}

const ProfileCardImage: React.FC<ProfileCardImageProps> = ({ picture }) => {
  return (
    <div className="w-[104px] h-[104px] max-h-[104px] rounded-full border-[3px] border-custom-purple overflow-hidden mb-6">
      {picture ? (
        <Image 
          loading="lazy" 
          src={picture} 
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
  )
}

export default ProfileCardImage
