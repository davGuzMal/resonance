"use client"
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react';
import Header from '@/components/dashboard/Header';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopCards } from '@/components/dashboard/TopCards';
import { BarChart } from '@/components/dashboard/BarChart';
import { RecentDirectories } from '@/components/dashboard/RecentDirectories';
import Link from 'next/link';

const Dashboard : NextPage = () => {
    
    const { data: session, status } = useSession()
    if(status === "unauthenticated"){
        return(
            <h1 className="text-3xl font-YsabeauInfant mt-64 md:text-center">
                You are not allowed to create directories, please hit the 
                <span>   </span>
                    <span className="relative">
                        <Link href="/registration">
                            <span className="block absolute -inset-0.5 -skew-y-3 bg-purple-500" aria-hidden="true"></span>
                            <span className="relative text-white hover:text-black">Registration </span>
                        </Link>
                    </span>
                <span>   </span> 
                or the
                <span>   </span>
                    <span className="relative">
                        <button onClick={() => signIn()}>
                            <span className="block absolute -inset-0.5 -skew-y-3 bg-purple-500" aria-hidden="true"></span>
                            <span className="relative text-white hover:text-black">log in </span>
                        </button>
                    </span>
                <span>   </span>                
                button
            </h1>
        )
    }
    return (
        <main className='bg-gray-100 min-h-screen'>
            <Sidebar
            session = {session}
            >
                <Header
                page="Dashboard"
                />
                <TopCards
                session = {session}
                />
                <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
                    <BarChart
                    session = {session}
                    />
                    <RecentDirectories
                    session = {session}
                    />
                </div>
            </Sidebar>
        </main>
        
    )
}

export default Dashboard;