import { FormProvider, useForm } from "react-hook-form"
import Input from "../common/components/Input"
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchemaType, profileSchema } from "@/lib/validators/profile";
import Typography from "../common/components/Typography";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { updateProfileInfo } from "@/lib/store/slices/profileSlice";

const ProfileInfo = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const methods = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
  });

  const updateFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProfileInfo({ ...profile, firstName: e.target.value }));
  };

  const updateLastName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProfileInfo({ ...profile, lastName: e.target.value }));
  };

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProfileInfo({ ...profile, email: e.target.value }));
  };

  return (
    <FormProvider {...methods}>
      <form className="bg-custom-gray-light rounded-md p-6 mb-6 sm:grid-cols-3">
        <div className="grid grid-cols-3 mb-4">
          <div className="flex items-center col-span-1">
            <Typography>First name</Typography>
          </div>
          <div className="col-span-2">
            <Input 
              validationName="firstName"
              noGutter
              inputProps={{ 
                value: profile.firstName || "",
                onChange: updateFirstName,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 mb-4">
          <div className="flex items-center col-span-1">
            <Typography>Last name</Typography>
          </div>
          <div className="col-span-2">
            <Input 
              validationName="lastName"
              noGutter
              inputProps={{
                value: profile.lastName || "",
                onChange: updateLastName,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 mb-4">
          <div className="flex items-center col-span-1">
            <Typography>Email</Typography>
          </div>
          <div className="col-span-2">
            <Input 
              validationName="email"
              noGutter
              inputProps={{ 
                type: "email", 
                value: profile.email || "",
                onChange: updateEmail,
              }}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default ProfileInfo
