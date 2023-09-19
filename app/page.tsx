"use client"
import type { NextPage } from 'next'
// import { SessionProvider } from 'next-auth/react';
// import { ReactQueryDevtools } from 'react-query/devtools'
// import { NextUIProvider } from '@nextui-org/react'
// import { QueryClient, QueryClientProvider } from 'react-query'
import  Content  from "../components/Content"
import Navbar from '@/components/Navbar';
// import createDB from '@/utils/createBD';

const Home : NextPage = () => {
  // const session = await getServerSession(options)
  // createDB()
  // const queryClient = new QueryClient()
  return (
    // <SessionProvider>
      // <QueryClientProvider client={queryClient}>
      // <NextUIProvider>
      //       <ReactQueryDevtools />

            <Navbar>
              <Content/>
            </Navbar>
          // </NextUIProvider>
      // </QueryClientProvider>
    // </SessionProvider>
    
    
  )
}

export default Home;