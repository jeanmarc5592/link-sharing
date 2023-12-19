"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/lib/constants/routes"
import Button from "../../common/components/Button"
import Input from "../../common/components/Input"
import Typography from "../../common/components/Typography"
import EmailIcon from "../../common/components/icons/EmailIcon"
import PasswordIcon from "../../common/components/icons/PasswordIcon"
import AuthCard from "./AuthCard"
import { useForm, FormProvider } from "react-hook-form";
import { LoginSchemaType, loginSchema } from "@/lib/validators/login";
import useLogin from "../hooks/useLogin";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  
  const { onSubmit, isLoading } = useLogin();

  const { handleSubmit, formState: { errors }} = methods;

  const onGoogleLogin = async () => {
    await signIn("google");
  };

  const onGithubLogin = async () => {
    await signIn("github");
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

          <Button
            className="mb-6"
            type="submit"
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>
      </FormProvider>

      <Typography className="mb-6 text-center">
        or with
      </Typography>

      <Button
        className="mb-6"
        variant="secondary"
        onClick={onGoogleLogin}
      >
        Google
      </Button>

      <Button
        className="mb-6"
        variant="secondary"
        onClick={onGithubLogin}
      >
        Github
      </Button>

      <Typography className="text-center">
        Don&apos;t have an account? <a className="text-custom-purple" href={ROUTES.auth.signup.href}>Create account</a>
      </Typography>
    </AuthCard>
  )
}

export default LoginForm
