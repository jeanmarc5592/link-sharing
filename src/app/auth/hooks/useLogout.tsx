"use client";

import { ROUTES } from "@/lib/constants/routes";
import { signOut } from "next-auth/react";

const useLogout = () => {
  const logout = async () => {
    return await signOut({
      callbackUrl: ROUTES.auth.login.href,
    });
  };

  return { logout };
}

export default useLogout;