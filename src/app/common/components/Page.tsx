import clsx from "clsx";
import { PropsWithChildren } from "react"

interface PageProps extends PropsWithChildren {
  hasBackdrop?: boolean;
}

const Page: React.FC<PageProps> = ({ children, hasBackdrop }) => {
  const backdropStyles = clsx(hasBackdrop ? "bg-transparent sm:bg-custom-purple rounded-b-3xl h-[25vh]" : "")

  return (
    <main className={backdropStyles}>
      <div className="max-w-screen-2xl mx-auto pt-4">
        {children}
      </div>
    </main>
  )
}

export default Page
