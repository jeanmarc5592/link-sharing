"use client"

import { useAppSelector } from "../common/hooks/useAppSelector"
import Links from "./Links";
import Profile from "./Profile";

const HomePageContent = () => {
  const activeTab = useAppSelector((state) => state.homeTabs.activeTab);

  return (
    <div className="flex w-full px-4">
      <div className="bg-white rounded-md w-1/3 mr-4 p-6">
        PREVIEW
      </div>
      <div className="bg-white w-2/3 rounded-md p-6">
        {activeTab === "links" && <Links />}
        {activeTab === "profile" && <Profile />}
      </div>
    </div>
  )
}

export default HomePageContent
