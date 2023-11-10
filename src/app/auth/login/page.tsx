import LoginForm from "@/app/_modules/auth/components/LoginForm"
import { authOptions } from "@/lib/auth/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <main className="w-[100vw] h-[100vh] flex justify-center sm:items-center">
      <LoginForm />
    </main>
  )
}

export default LoginPage
