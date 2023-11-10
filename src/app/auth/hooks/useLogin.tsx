"use client"

import { ROUTES } from "@/lib/constants/routes";
import { LoginSchemaType } from "@/lib/validators/login";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (data: LoginSchemaType) => {
    const { email, password } = data;
    const callbackUrl: string = searchParams.get("callbackUrl") || ROUTES.home.href;

    try {
      const response = await signIn("login", {
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
  
  return { onSubmit };
}

export default useLogin
