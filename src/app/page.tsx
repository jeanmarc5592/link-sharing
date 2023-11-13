import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "./auth/components/LogoutButton";
import { authOptions } from "@/lib/auth/options";
import Header from "./common/components/Header";
import HomePageContent from "./components/HomePageContent";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }
  
  return (
    <main>
      <Header />
      <HomePageContent />
      <LogoutButton />
    </main>
  )
}

export default HomePage;