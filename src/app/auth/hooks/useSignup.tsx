"use client";

import { ROUTES } from "@/lib/constants/routes";
import { SignupSchemaType } from "@/lib/validators/signup";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const useSignup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (data: SignupSchemaType) => {
    const { email, password, confirmPassword } = data;
    const callbackUrl: string = searchParams.get("callbackUrl") || ROUTES.home.href;

    try {
      const response = await signIn("signup", {
        redirect: false,
        email,
        password,
        confirmPassword,
        callbackUrl,
      });

      if (!response?.error && response?.status == 200) {
        router.push(callbackUrl);
      }
    } catch (error) {
      // TODO: Render Error notification
      console.error(error);
    }
  }

  return { onSubmit };
}

export default useSignup;