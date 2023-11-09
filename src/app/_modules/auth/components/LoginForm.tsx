"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/lib/constants/routes"
import Button from "../../common/components/Button"
import Input from "../../common/components/Input"
import Typography from "../../common/components/Typography"
import EmailIcon from "../../common/components/icons/EmailIcon"
import PasswordIcon from "../../common/components/icons/PasswordIcon"
import AuthCard from "./AuthCard"
import { useForm, FormProvider } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

const loginFormSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const methods = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });
  const { handleSubmit, formState: { errors }} = methods;

  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (data: LoginFormSchemaType) => {
    const { email, password } = data;

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      console.log(response);

      if (!response?.error && response?.status == 200) {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthCard>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="Heading M" className="mb-4">Login</Typography>
          <Typography className="mb-10 sm:mb-12">Add your details below to get back into the app</Typography>

          <Input 
            label="Email address" 
            validationName="email"
            inputProps={{ placeholder: "e.g alex@email.com" }}
            icon={<EmailIcon />}
            error={errors.email?.message}
          />

          <Input 
            label="Password" 
            validationName="password"
            inputProps={{ placeholder: "Enter your password", type: "password" }}
            icon={<PasswordIcon />}
            error={errors.password?.message}
          />

          <Button type="submit">Login</Button>

          <Typography className="text-center">
            Don&apos;t have an account? <a className="text-custom-purple" href={ROUTES.auth.signup.href}>Create account</a>
          </Typography>
        </form>
      </FormProvider>
    </AuthCard>
  )
}

export default LoginForm
