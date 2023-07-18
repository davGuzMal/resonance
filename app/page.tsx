"use client"
import type { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import  Content  from "../components/Content"
// import createDB from '@/utils/createBD';

const Home : NextPage = () => {
  // const session = await getServerSession(options)
  // createDB()
  const queryClient = new QueryClient()
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Content
          // userauth = {session?.user?.name}
        />
      </QueryClientProvider>
    </SessionProvider>
    
    
  )
}

export default Home;