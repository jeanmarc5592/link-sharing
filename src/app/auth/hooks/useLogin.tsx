"use client"

import { ROUTES } from "@/lib/constants/routes";
import { LoginSchemaType } from "@/lib/validators/login";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (data: LoginSchemaType) => {
    setIsLoading(true);

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

    setIsLoading(false);
  };
  
  return { onSubmit, isLoading };
}

export default useLogin
