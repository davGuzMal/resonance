"use client"
import type { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/dashboard/Header';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopCards } from '@/components/dashboard/TopCards';
import { BarChart } from '@/components/dashboard/BarChart';
import { RecentDirectories } from '@/components/dashboard/RecentDirectories';

const Dashboard : NextPage = () => {
    const queryClient = new QueryClient()
    return (
        <main className='bg-gray-100 min-h-screen'>
            <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <Sidebar>
                    <Header
                    page="Dashboard"
                    />
                    <TopCards/>
                    <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
                        <BarChart/>
                        <RecentDirectories/>
                    </div>
                </Sidebar>
            </SessionProvider>            
            </QueryClientProvider>
        </main>
        
    )
}

export default Dashboard;