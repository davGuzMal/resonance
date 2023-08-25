"use client"
import type { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/dashboard/Header';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Sidebar } from '@/components/dashboard/Sidebar';
import { CustomerDirectories } from '@/components/dashboard/CustomerDirectories';


const Directories : NextPage = () => {
  const queryClient = new QueryClient()
  return (
    <main className='bg-gray-100 min-h-screen'>
        <QueryClientProvider client={queryClient}>
        <SessionProvider>
            <Sidebar>
                <Header
                  page = "Directories"
                />
                <CustomerDirectories/>
            </Sidebar>
        </SessionProvider>            
        </QueryClientProvider>
    </main>
  )
}


export default Directories;