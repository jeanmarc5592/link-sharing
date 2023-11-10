import { authOptions } from '@/lib/auth/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SignupForm from '../../_modules/auth/components/SignupForm';

const SignupPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center sm:items-center">
      <SignupForm />
    </div>
  )
}

export default SignupPage
