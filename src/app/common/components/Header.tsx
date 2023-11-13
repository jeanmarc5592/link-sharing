"use client"

import Button from './Button'
import Logo from './Logo'
import Tab from './Tab'
import LinkIcon from './icons/LinkIcon'
import ProfileDetailsIcon from './icons/ProfileDetailsIcon'
import { useAppSelector } from '../hooks/useAppSelector'

const Header = () => {
  const activeTab = useAppSelector((state) => state.homeTabs.activeTab);

  return (
    <div className="bg-white rounded-md p-4 flex items-center justify-between">
      <Logo />

      <div className="flex">
        <Tab 
          label="Links"
          id="links"
          isActive={activeTab === "links"}
          icon={<LinkIcon isActive={activeTab === "links"} />}
        />
        <Tab
          label="Profile Details"
          id="profile"
          isActive={activeTab === "profile"}
          icon={<ProfileDetailsIcon isActive={activeTab === "profile"} />}
        />
      </div>

      <div>
        <Button className="mb-0" variant="secondary">Preview</Button>
      </div>
    </div>
  )
}

export default Header
