"use client"

import { useMutation } from "@tanstack/react-query"
import Typography from "../common/components/Typography"
import ImageIcon from "../common/components/icons/ImageIcon"
import { useAppSelector } from "../common/hooks/useAppSelector"
import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary"
import { UserUpdates } from "../services/types"
import { updateMe } from "../services/users"
import { useAppDispatch } from "../common/hooks/useAppDispatch"
import { setProfile, updateProfileInfo, updateProfilePicture } from "@/lib/store/slices/profileSlice"
import Image from "next/image"
import { toast } from "react-toastify"
import { ROUTES } from "@/lib/constants/routes"
import { User } from "@prisma/client"

const ProfilePicture = () => {
  const updateMeMutation = useMutation({
    mutationKey: ["users"],
    mutationFn: (updates: Partial<User>) => {
      return updateMe(updates);
    }
  });

  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const onUploadSuccess = async (result: CldUploadWidgetResults) => {
    if (!result?.info) {
      return;
    }

    if (typeof result?.info !== "object" || !("url" in result?.info)) {
      console.log("result is not an object or 'url' is not a key");
      return;
    }

    try {
      const { picture } = await updateMeMutation.mutateAsync({ picture: result.info.url as string });

      if (!picture) {
        throw new Error("Picture is null");
      }

      dispatch(updateProfilePicture(picture));
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong updating your image. Please try again.")
    }
  };

  return (
    <div className="grid grid-cols-1 bg-custom-gray-light rounded-md p-6 mb-6 sm:grid-cols-3">
      <div className="flex items-center col-span-1">
        <Typography className="mb-4 sm:mb-0">Profile picture</Typography>
      </div>

      <div className="col-span-2 flex flex-col sm:flex-row">
        <CldUploadWidget 
          signatureEndpoint={ROUTES.cloudinary.signature.href}
          onSuccess={onUploadSuccess}
        >
          {({ open }) => {
            return (
              <>
                <div 
                  onClick={() => open()}
                  className="flex flex-col justify-center items-center ml-0 mr-0 mb-4 w-[193px] h-[193px] cursor-pointer bg-custom-purple-light rounded-md sm:mb-0 sm:mr-6"
                >
                  {profile.picture === null ? (
                    <>
                      <ImageIcon />
                      <Typography className="text-custom-purple font-semibold mt-2">+ Upload Image</Typography>
                    </>
                  ) : (
                    <div className="relative group">
                      <Image 
                        loading="lazy" 
                        src={profile.picture} 
                        width={193} 
                        height={193} 
                        alt="Profile Image" 
                        className="rounded-md group-hover:opacity-100 transition-opacity" 
                      />
                      <div className="opacity-0 group-hover:opacity-100 bg-custom-black-rgba flex flex-col justify-center items-center rounded-md transition-all absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full h-full">
                        <ImageIcon isSelected />
                        <Typography className="text-white font-semibold mt-2">Change Image</Typography>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}}
        </CldUploadWidget>

        <div className="flex flex-col justify-center">
          <Typography variant="Body S">Image must be below 1024x1024px.&nbsp;</Typography>
          <Typography variant="Body S">Use PNG or JPG format.</Typography>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicture