"use client"

import { signOut } from "next-auth/react";
import Button from "./_modules/common/components/Button";

const HomePage = () => {
  // TODO: Use AuthService here
  const logout = () =>  {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <main>
      HOME PAGE
      
      <div className="w-[25vw]">
        <Button variant="primary" onClick={logout}>Log out</Button>
      </div>
    </main>
  )
}

export default HomePage;