// import { getAuthSession } from '@/lib/auth'
import React from 'react'

interface Sess {
  name: string
}

const Home = async () => {
  // const session = await getAuthSession();
  const session : Sess = {
    name : 'ashik'
  };
  return (
    <div>
      <h1 className="text-6xl font-extralight">Hello, {session?.name}</h1>
    </div>
  )
}

export default Home