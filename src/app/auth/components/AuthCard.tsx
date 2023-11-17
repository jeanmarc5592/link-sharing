import { PropsWithChildren } from "react"
import Logo from "../../common/components/Logo"

const AuthCard = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col sm:items-center">
      <Logo className="px-10 mt-10 mb-4 sm:mb-10 sm:p-0" />

      <div className="p-10 sm:bg-white sm:rounded-md sm:shadow-sm">
        {children}
      </div>
    </div>
  )
}

export default AuthCard
