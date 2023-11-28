import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Page from "../common/components/Page"
import { ROUTES } from "@/lib/constants/routes";
import PreviewHeader from "./components/PreviewHeader";
import ProfileCard from "../share/components/ProfileCard";

const PreviewPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(ROUTES.auth.login.href);
  }

  return (
    <Page>
      <PreviewHeader />
      <ProfileCard />
    </Page>
  )
}

export default PreviewPage
