import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "./auth/components/LogoutButton";
import { authOptions } from "@/lib/auth/options";
import Header from "./common/components/Header";
import HomePageContent from "./components/HomePageContent";
import Page from "./common/components/Page";
import { ROUTES } from "@/lib/constants/routes";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(ROUTES.auth.login.href);
  }
  
  return (
    <Page>
      <Header />
      <HomePageContent />
      <LogoutButton />
    </Page>
  )
}

export default HomePage;