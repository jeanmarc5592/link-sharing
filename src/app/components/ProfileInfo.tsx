import { FormProvider, useForm } from "react-hook-form"
import Input from "../common/components/Input"
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchemaType, profileSchema } from "@/lib/validators/profile";
import Typography from "../common/components/Typography";

const ProfileInfo = () => {
  const methods = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
  });

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
              inputProps={{ type: "email" }}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default ProfileInfo
