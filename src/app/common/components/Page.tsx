import { PropsWithChildren } from "react"

const Page = ({ children }: PropsWithChildren) => {
  return (
    <main className="max-w-screen-2xl mx-auto">
      {children}
    </main>
  )
}

export default Page
