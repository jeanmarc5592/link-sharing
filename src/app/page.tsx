"use client"

import Input from "./_modules/common/components/Input";
import Typography from "./_modules/common/components/Typography";
import { trpc } from "./_trpc/client"

const Icon = () => {
  return (
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
    </svg>
  )
}

export default function Home() {
  const { data: users } = trpc.getUsers.useQuery();

  return (
    <main>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <br />

      <p className="text-custom-purple">Custom Purple</p>
      <p className="text-custom-purple-lighter">Custom Purple Lighter</p>
      <p className="text-custom-purple-light">Custom Purple Light</p>
      <p className="text-custom-black">Custom Black</p>
      <p className="text-custom-gray">Custom Gray</p>
      <p className="text-custom-gray-lighter">Custom Gray Lighter</p>
      <p className="text-custom-gray-light">Custom Gray Light</p>
      <p className="text-custom-red">Custom Gray Red</p>
      <br />

      <Typography variant="Heading M">Heading M</Typography>
      <Typography variant="Heading S">Heading S</Typography>
      <Typography variant="Body M">Body M</Typography>
      <Typography variant="Body S">Body S</Typography>
      <br />

      <div className="p-3">
        <Input label="This is the input" inputProps={{ placeholder: "A cool placeholder" }} icon={<Icon />} />
        <Input label="This is the input" inputProps={{ placeholder: "A cool placeholder" }} error="Error Message" icon={<Icon />} />
      </div>
    </main>
  )
}
