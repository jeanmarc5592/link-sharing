import Button from './Button'
import Logo from './Logo'
import Tab from './Tab'
import LinkIcon from './icons/LinkIcon'
import ProfileDetailsIcon from './icons/ProfileDetailsIcon'

const Header = () => {
  const isActive = true;

  return (
    <div className="bg-white rounded-md p-4 flex items-center justify-between">
      <Logo />

      <div className="flex">
        <Tab 
          isActive={isActive}
          icon={<LinkIcon isActive={isActive} />}
        >
          Links
        </Tab>
        <Tab
          isActive={false}
          icon={<ProfileDetailsIcon isActive={false} />}
        >
          Profile Details
        </Tab>
      </div>

      <div>
        <Button className="mb-0" variant="secondary">Preview</Button>
      </div>
    </div>
  )
}

export default Header
