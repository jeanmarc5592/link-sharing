"use client"

import { signOut } from "next-auth/react";
import Button from "../../common/components/Button"

const LogoutButton = () => {
  // TODO: Use AuthService here
  // TODO: Use ROUTES constant
  const logout = () =>  {
    signOut({ callbackUrl: "/auth/login" });
  };
  
  return (
    <div className="w-[25vw]">
      <Button variant="primary" onClick={logout}>Log out</Button>
    </div>
  )
}

export default LogoutButton
