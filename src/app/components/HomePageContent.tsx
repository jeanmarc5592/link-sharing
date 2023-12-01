"use client"

import { useAppSelector } from "../common/hooks/useAppSelector"
import Links from "./Links";
import Preview from "./PhonePreview";
import Profile from "./Profile";

const HomePageContent = () => {
  const activeTab = useAppSelector((state) => state.homeTabs.activeTab);

  return (
    <div className="flex w-full px-4">
      <div className="bg-white rounded-md w-1/3 mr-4 p-6 hidden lg:flex justify-center items-center">
        <Preview />
      </div>
      <div className="bg-white rounded-md w-full lg:w-2/3 p-6">
        {activeTab === "links" && <Links />}
        {activeTab === "profile" && <Profile />}
      </div>
    </div>
  )
}

export default HomePageContent
