import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "./auth/components/LogoutButton";
import { authOptions } from "@/lib/auth/options";
import Header from "./common/components/Header";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }
  
  return (
    <main className="p-4">
      <Header />
      
      <LogoutButton />
    </main>
  )
}

export default HomePage;