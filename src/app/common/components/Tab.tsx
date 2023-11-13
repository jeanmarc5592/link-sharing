import clsx from "clsx";
import { PropsWithChildren, ReactNode } from "react"

interface TabProps extends PropsWithChildren {
  isActive?: boolean;
  icon?: ReactNode;
}

const Tab: React.FC<TabProps> = ({ children, icon, isActive = false }) => {
  const defaultStyle = "flex items-center font-semibold text-custom-gray py-3 px-6 mr-4 cursor-pointer rounded-md transition-all"
  const activeStyle = "bg-custom-purple-light text-custom-purple";

  return (
    <div className={clsx(defaultStyle, isActive && activeStyle)}>
      {icon && <div className="mr-2">{icon}</div>}
      
      {children}
    </div>
  )
}

export default Tab
