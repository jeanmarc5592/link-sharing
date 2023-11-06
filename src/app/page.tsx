"use client"

import Typography from "./_modules/common/components/Typography";
import { trpc } from "./_trpc/client"

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
      
    </main>
  )
}
