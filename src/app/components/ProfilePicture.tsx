"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import Typography from "../common/components/Typography"
import ImageIcon from "../common/components/icons/ImageIcon"
import { useAppSelector } from "../common/hooks/useAppSelector"
import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary"
import { UserUpdates } from "../services/types"
import { updateMe } from "../services/users"
import { useAppDispatch } from "../common/hooks/useAppDispatch"
import { setProfile } from "@/lib/store/slices/profileSlice"

const ProfilePicture = () => {
  const updateDateMe = useMutation({
    mutationKey: ["users"],
    mutationFn: (updates: UserUpdates) => {
      return updateMe(updates);
    }
  });

  const imageUrl = useAppSelector((state) => state.profile.picture);
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
      const response = await updateDateMe.mutateAsync({ picture: result.info.url as string });
      dispatch(setProfile(response));
    } catch (error) {
      console.error(error);
      // TODO: Throw error notification
    }
  };

  return (
    <div className="grid grid-cols-1 bg-custom-gray-light rounded-md p-6 mb-6 sm:grid-cols-3">
      <div className="flex items-center col-span-1">
        <Typography className="mb-4 sm:mb-0">Profile picture</Typography>
      </div>

      <div className="col-span-2 flex flex-col sm:flex-row">
        <CldUploadWidget 
          signatureEndpoint="/api/cloudinary/signature"
          onSuccess={onUploadSuccess}
        >
          {({ open }) => {
            return (
              <>
                <div 
                  onClick={() => open()}
                  className="flex flex-col justify-center items-center ml-0 mr-0 mb-4 w-[193px] h-[193px] cursor-pointer bg-custom-purple-light rounded-md sm:mb-0 sm:mr-6"
                >
                  {imageUrl === null ? (
                    <>
                      <ImageIcon />
                      <Typography className="text-custom-purple font-semibold mt-2">+ Upload Image</Typography>
                    </>
                  ) : (
                    <>
                      {/* TODO: Render profile picture */}
                    </>
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