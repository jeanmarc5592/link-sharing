import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "./_modules/auth/components/LogoutButton";
import { authOptions } from "@/lib/auth/options";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }
  
  return (
    <main>
      HOME PAGE
      
      <LogoutButton />
    </main>
  )
}

export default HomePage;