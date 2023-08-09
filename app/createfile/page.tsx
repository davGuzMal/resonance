"use client"
import type { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react';
import { ReactQueryDevtools } from 'react-query/devtools'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import  NewDirectory  from "../../components/NewDirectory"
import Navbar from '@/components/Navbar';
// import createDB from '@/utils/createBD';

const CreateFile : NextPage = () => {
  
  const queryClient = new QueryClient()
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
          <NextUIProvider>
            <Navbar>
              <NewDirectory/>
            </Navbar>
          </NextUIProvider>
      </QueryClientProvider>
    </SessionProvider>
    
    
  )
}

export default CreateFile;