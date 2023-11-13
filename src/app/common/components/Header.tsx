"use client"

import Button from './Button'
import Logo from './Logo'
import Tab from './Tab'
import LinkIcon from './icons/LinkIcon'
import ProfileDetailsIcon from './icons/ProfileDetailsIcon'
import { useAppSelector } from '../hooks/useAppSelector'
import LogoIcon from './icons/LogoIcon'
import PreviewIcon from './icons/PreviewIcon'

const Header = () => {
  const activeTab = useAppSelector((state) => state.homeTabs.activeTab);

  return (
    <div className="bg-white rounded-md p-4 flex items-center justify-evenly sm:m-4">
      <Logo className="hidden sm:flex" />
      <div className="sm:hidden">
        <LogoIcon />
      </div>

      <div className="flex mr-auto ml-auto">
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
        <Button className="mb-0" variant="secondary">
          <span className="hidden sm:block">Preview</span>
          <span className="sm:hidden"><PreviewIcon /></span>
        </Button>
      </div>
    </div>
  )
}

export default Header
