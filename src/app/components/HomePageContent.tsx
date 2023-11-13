"use client"

import { useAppSelector } from "../common/hooks/useAppSelector"

const HomePageContent = () => {
  const activeTab = useAppSelector((state) => state.homeTabs.activeTab);

  return (
    <div>
      Active Tab: {activeTab}
    </div>
  )
}

export default HomePageContent
