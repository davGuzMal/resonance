'use client'

import {NextPage } from 'next'
import Link from 'next/link';
import {signIn, signOut, useSession} from 'next-auth/react'
import { FiLogOut } from 'react-icons/fi'

const Navbar : NextPage = () => {

    // const session = await getServerSession(options) 
    const { data: session, status } = useSession()
    console.log(session)
        
    return (
        <nav className='sticky top-0 w-full bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 z-30 flex gap-3 shadow-md py-5 px-4 items-center transition-all'>
            
                <div className="group flex justify-center items-center relative w-70 bg-transparent-200 cursor-pointer text-4xl">
                    <Link className="" href={'/'}>
                        <div className='font-Rubik transition-all  hover:drop-shadow-md group-hover:text-gray-100'>
                            Reso
                            <span className='text-white group-hover:text-black'>
                                nance
                            </span>
                        </div>                        
                    </Link>
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
                </div>
                <div className="flex ml-16 mr-4 w-full text-center justify-around font-medium uppercase font-Rubik transition-all">
                                        
                        <Link className='hover:text-white' href="/">Home</Link>                    
                    
                        <Link className='hover:text-white' href="/contact">Contact</Link>
                    
                        <Link className='hover:text-white' href="/about">About</Link>
                    
                    
                </div>
                <div className="font-Rubik ml-2 w-64">
                    {status !== "authenticated" ? (
                        <div className='flex justify-between'>
                            
                            <Link href="/registration"> Registration</Link>                                 
                            
                            <p> | </p>
                            <button
                            className='hover:text-white'
                            onClick={() => signIn()}>
                                Log In 
                            </button>                            
                        </div>
                    ) : (
                        <div className='flex flex-row justify-between align-center items-center'>                            
                            <h3 className='mx-2'>
                                {session?.user?.name?.slice(0, session.user.name.indexOf(' '))}  
                            </h3>
                            <button
                            className='hover:text-white'
                            onClick={() => signOut()}>
                                <FiLogOut/> 
                            </button>
                        </div>
                    )}
                </div>
            
        </nav>
    )
}

export default Navbar;