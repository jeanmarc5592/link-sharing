"use client"

import { ROUTES } from "@/lib/constants/routes";
import { LoginSchemaType } from "@/lib/validators/login";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (data: LoginSchemaType) => {
    const { email, password } = data;
    const callbackUrl: string = searchParams.get("callbackUrl") || ROUTES.home.href;

    const response = await signIn("login", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (!response?.ok) {
      toast.error("User name or password is wrong.");
    }

    if (!response?.error && response?.status == 200) {
      router.push(callbackUrl);
    }
  };
  
  return { onSubmit };
}

export default useLogin
