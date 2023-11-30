import { authOptions } from "@/lib/auth/options";
import { ROUTES } from "@/lib/constants/routes";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react"

interface PageProps extends PropsWithChildren {
  hasBackdrop?: boolean;
  isProtected?: boolean;
}

const Page: React.FC<PageProps> = async ({ children, hasBackdrop, isProtected = false }) => {
  const session = await getServerSession(authOptions);

  if (!session && isProtected) {
    redirect(ROUTES.auth.login.href);
  }

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
