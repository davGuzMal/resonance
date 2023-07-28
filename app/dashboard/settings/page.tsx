"use client"
import type { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/dashboard/Header';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Sidebar } from '@/components/dashboard/Sidebar';
import CustomerSettings from '@/components/dashboard/CustomerSettings';


const Settings : NextPage = () => {
  const queryClient = new QueryClient()
  return (
    <main className='bg-gray-100 min-h-screen'>
        <QueryClientProvider client={queryClient}>
        <SessionProvider>
            <Sidebar>
                <Header
                  page = "Settings"
                />
                <CustomerSettings/>
            </Sidebar>
        </SessionProvider>            
        </QueryClientProvider>
    </main>
  )
}


export default Settings;