"use client"
import type { NextPage } from 'next'
import { useSession, signIn } from 'next-auth/react';
import Header from '@/components/dashboard/Header';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { CustomerList } from '@/components/dashboard/CustomerList';
import Link from 'next/link';


const Customers : NextPage = () => {
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
        <Sidebar>
            <Header
              page = "Customers"
            />
            <CustomerList/>
        </Sidebar>        
    </main>
  )
}


export default Customers;