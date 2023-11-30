import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Page from "../common/components/Page"
import { ROUTES } from "@/lib/constants/routes";
import PreviewHeader from "./components/PreviewHeader";
import ProfileCard from "../share/components/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { getLinks } from "../services/links";
import { getMe } from "../services/users";
import ProfileCardSkeleton from "../share/components/ProfileCardSkeleton";

const PreviewPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(ROUTES.auth.login.href);
  }

  const getMeQuery = useQuery({
    queryKey: ['users'],
    queryFn: getMe
  });

  const getLinksQuery = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  });

  const { data: profile } = getMeQuery;
  const { data: links } = getLinksQuery;

  return (
    <Page hasBackdrop>
      <PreviewHeader />

      {getMeQuery.isLoading && getLinksQuery.isLoading ? (
        <ProfileCardSkeleton />
      ) : (
        <ProfileCard 
          firstName={profile?.firstName || undefined} 
          lastName={profile?.lastName || undefined} 
          picture={profile?.picture || undefined}
          email={profile?.email || undefined}
          links={links}
        />
      )}
    </Page>
  )
}

export default PreviewPage
