import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react'
import { RxDashboard, RxPerson} from 'react-icons/rx'
import { VscThreeBars } from "react-icons/vsc";
import { FiSettings } from 'react-icons/fi';
import { VscFiles } from 'react-icons/vsc'

type SidebarProps = {
    children: React.ReactNode;
    session : any
}
export const Sidebar = (props : SidebarProps) => {
    const { session } = props
    //state to show or hide sidebar
    const [isOpen, setIsOpen] = useState(false)

    //function to show sideBar
    const onClose = () => {
        setIsOpen(false)
    }  
    
  return (
    <div className='flex'>
        {
            !isOpen ? (
                <>
                
                    <div className='fixed w-auto h-10 p-2 bg-white ml-2 mt-4 text-2xl rounded-lg' onMouseOver={() => setIsOpen(true)}>
                        <VscThreeBars />
                    </div>
                    <main className='ml-8 w-full' onMouseOver={() => setIsOpen(false)}>

                        {props.children}
                    </main>
                </>
            ) :
            (
                <>
                
                    <div className='fixed w-auto h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
                        <div className='flex flex-col items-center'>
                            <Link href='/'>
                                <div className='bg-gray-100 hover:bg-gray-200 text-white p-1 rounded-lg inline-block'>
                                    {/* <RxSketchLogo size={20}/> */}
                                    <Image 
                                        src="/img/logoResonance.png" 
                                        alt="icon"
                                        width={40}
                                        height={40}
                                        className='rounded-lg'
                                    />
                                </div>
                            </Link>
                            <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                            <Link href='/dashboard'>
                                <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block'>
                                    <RxDashboard size={20}/>
                                </div>
                            </Link>
                            <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                            <Link href='/dashboard/directories'>
                                <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block'>
                                    <VscFiles size={20}/>
                                </div>
                            </Link>
                            {session?.user?.role === "ADMIN" ?
                                <>
                                
                                    <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                                    <Link href='/dashboard/customers'>
                                        <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block'>
                                            <RxPerson size={20}/>
                                        </div>
                                    </Link>
                                </>
                                : null
                            
                            }
                            <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                            <Link href='/dashboard/settings'>
                                <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block'>
                                    <FiSettings size={20}/>
                                </div>
                            </Link>
                            <span className='border-b-[1px] border-gray-200 w-full p-2'></span>

                        </div>
                    </div>
                    <main className='ml-16 w-full' onMouseOver={() => setIsOpen(false)}>

                        {props.children}
                    </main>
                </>
            )
        }
    </div>
  )
}
