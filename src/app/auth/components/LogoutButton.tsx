"use client"

import Button from "../../common/components/Button"
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
  const { logout } = useLogout();
  
  return (
    <div className="w-fit pl-4 mt-8">
      <Button variant="secondary" onClick={logout}>Log out</Button>
    </div>
  )
}

export default LogoutButton
