import LogoutButton from "./auth/components/LogoutButton";
import Header from "./common/components/Header";
import HomePageContent from "./components/HomePageContent";
import Page from "./common/components/Page";

const HomePage = async () => {
  return (
    <Page isProtected>
      <Header />
      <HomePageContent />
      <LogoutButton />
    </Page>
  )
}

export default HomePage;