"use client"

import Button from './Button'
import Logo from './Logo'
import Tab from './Tab'
import LinkIcon from './icons/LinkIcon'
import ProfileDetailsIcon from './icons/ProfileDetailsIcon'
import { useAppSelector } from '../hooks/useAppSelector'
import LogoIcon from './icons/LogoIcon'
import PreviewIcon from './icons/PreviewIcon'
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants/routes'
import TrendUpIcon from './icons/TrendUpIcon'

const Header = () => {
  const activeTab = useAppSelector((state) => state.homeTabs.activeTab);
  const router = useRouter();

  const navigateToPreview = () =>{
    router.push(ROUTES.preview.href);
  }

  return (
    <div className="bg-white rounded-md p-4 mb-4 mx-4 flex items-center justify-evenly">
      <Logo className="hidden sm:flex" />
      <div className="sm:hidden">
        <LogoIcon />
      </div>

      <div className="flex mr-auto ml-auto">
        <Tab 
          label="Links"
          id="links"
          isActive={activeTab === "links"}
          icon={<LinkIcon isSelected={activeTab === "links"} />}
        />
        <Tab
          label="Profile Details"
          id="profile"
          isActive={activeTab === "profile"}
          icon={<ProfileDetailsIcon isSelected={activeTab === "profile"} />}
        />
        <Tab
          label="Analytics"
          id="analytics"
          isActive={activeTab === "analytics"}
          icon={<TrendUpIcon isSelected={activeTab === "analytics"} />}
        />
      </div>

      <div>
        <Button className="mb-0" variant="secondary" onClick={navigateToPreview}>
          <span className="hidden sm:block">Preview</span>
          <span className="sm:hidden"><PreviewIcon /></span>
        </Button>
      </div>
    </div>
  )
}

export default Header
