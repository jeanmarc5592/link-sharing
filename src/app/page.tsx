"use client"

import { trpc } from "./_trpc/client"

export default function Home() {
  const { data: users } = trpc.getUsers.useQuery();

  return (
    <main>
      <pre>
        {JSON.stringify(users, null, 2)}
      </pre>
    </main>
  )
}
