import clsx from "clsx";
import { ReactNode } from "react"
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setActiveTab } from "@/lib/store/slices/homeTabsSlice";

interface TabProps {
  label: string;
  id: string;
  isActive?: boolean;
  icon?: ReactNode;
}

const Tab: React.FC<TabProps> = ({ label, id, icon, isActive = false }) => {
  const dispatch = useAppDispatch();

  const defaultStyle = "flex items-center font-semibold text-custom-gray py-3 px-6 cursor-pointer rounded-md transition-all sm:mr-4"
  const activeStyle = "bg-custom-purple-light text-custom-purple";

  const handleClick = () => {
    dispatch(setActiveTab(id));
  }

  return (
    <div 
      className={clsx(defaultStyle, isActive && activeStyle)}
      onClick={handleClick}
    >
      {icon && <div className="sm:mr-2">{icon}</div>}
      
      <span className="hidden sm:block">{label}</span>
    </div>
  )
}

export default Tab
