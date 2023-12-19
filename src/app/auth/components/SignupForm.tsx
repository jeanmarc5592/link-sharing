"use client"

import AuthCard from './AuthCard'
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import Typography from '../../common/components/Typography';
import Input from '../../common/components/Input';
import EmailIcon from '../../common/components/icons/EmailIcon';
import PasswordIcon from '../../common/components/icons/PasswordIcon';
import { ROUTES } from '@/lib/constants/routes';
import Button from '../../common/components/Button';
import { SignupSchemaType, signupSchema } from '@/lib/validators/signup';
import useSignup from '../hooks/useSignup';
import { signIn } from 'next-auth/react';

const SignupForm = () => {
  const methods = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const { onSubmit, isLoading } = useSignup();

  const { handleSubmit, formState: { errors }} = methods;

  const onGoogleSignup = async () => {
    await signIn("google");
  };

  const onGithubLogin = async () => {
    await signIn("github");
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

          <Button 
            className="mb-6"
            isLoading={isLoading} 
            type="submit"
          >
            Create new account
          </Button>
        </form>
      </FormProvider>

      <Typography className="mb-6 text-center">
        or with
      </Typography>

      <Button
        className="mb-6"
        variant="secondary"
        onClick={onGoogleSignup}
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
        Already have an account? <a className="text-custom-purple" href={ROUTES.auth.login.href}>Sign in</a>
      </Typography>
    </AuthCard>
  )
}

export default SignupForm
