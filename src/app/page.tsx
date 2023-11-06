"use client"

import Typography from "./_modules/common/components/Typography";
import { trpc } from "./_trpc/client"

export default function Home() {
  const { data: users } = trpc.getUsers.useQuery();

  return (
    <main>
      <pre>{JSON.stringify(users, null, 2)}</pre>

      <p className="text-custom-purple">Custom Purple</p>
      <p className="text-custom-purple-lighter">Custom Purple Lighter</p>
      <p className="text-custom-purple-light">Custom Purple Light</p>
      <p className="text-custom-black">Custom Black</p>
      <p className="text-custom-gray">Custom Gray</p>
      <p className="text-custom-gray-lighter">Custom Gray Lighter</p>
      <p className="text-custom-gray-light">Custom Gray Light</p>
      <p className="text-custom-red">Custom Gray Red</p>

      <Typography>Heading M</Typography>
    </main>
  )
}
