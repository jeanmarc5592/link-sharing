"use client"

import AuthCard from './AuthCard'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import Typography from '../../common/components/Typography';
import Input from '../../common/components/Input';
import EmailIcon from '../../common/components/icons/EmailIcon';
import PasswordIcon from '../../common/components/icons/PasswordIcon';
import { ROUTES } from '@/lib/constants/routes';
import Button from '../../common/components/Button';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SignupSchemaType, signupSchema } from '@/lib/validators/signup';

const SignupForm = () => {
  const methods = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });
  const { handleSubmit, formState: { errors }} = methods;

  const searchParams = useSearchParams();
  // TODO: Use ROUTES constant for home route
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const router = useRouter();

  const onSubmit = async (data: SignupSchemaType) => {
    const { email, password } = data;

    // TODO: Create and use AuthService
    try {
      const response = await signIn("signup", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!response?.error && response?.status == 200) {
        router.push(callbackUrl);
      }
    } catch (error) {
      // TODO: Render Error notification
      console.error(error);
    }
  };

  return (
    <AuthCard>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="Heading M" className="mb-4">Create account</Typography>
          <Typography className="mb-10 sm:mb-12">Create a free account and get started sharing your links!</Typography>

          <Input 
            label="Email address" 
            validationName="email"
            inputProps={{ placeholder: "e.g alex@email.com" }}
            icon={<EmailIcon />}
            error={errors.email?.message}
          />

          <Input 
            label="Create password" 
            validationName="password"
            inputProps={{ placeholder: "At least 8 characters", type: "password" }}
            icon={<PasswordIcon />}
            error={errors.password?.message}
          />

          <Input 
            label="Confirm password" 
            validationName="confirmPassword"
            inputProps={{ placeholder: "At least 8 characters", type: "password" }}
            icon={<PasswordIcon />}
            error={errors.confirmPassword?.message}
          />

          <Button type="submit">Create new account</Button>

          <Typography className="text-center">
            Already have an account? <a className="text-custom-purple" href={ROUTES.auth.login.href}>Login</a>
          </Typography>
        </form>
      </FormProvider>
    </AuthCard>
  )
}

export default SignupForm
