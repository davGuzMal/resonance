'use client'
// import {NextPage } from 'next'
import Link from 'next/link';
import {signIn, signOut, useSession} from 'next-auth/react'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Avatar,  User, Dropdown, Text } from "@nextui-org/react";

type NavbarProps = {
    children: React.ReactNode;
}

const Navbar  = (props : NavbarProps) => {

    // const session = await getServerSession(options) 
    const { data: session, status } = useSession()    
    // console.log(session)
   
    return (
        <>
        
            <nav className='flex justify-between font-YsabeauInfant sticky top-0 w-full bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-purple-200 via-gray-100 z-30 flex gap-3 shadow-md p-2 items-center transition-all m-2 rounded-lg'>
                
                    <div className="group flex justify-center items-center relative w-70 bg-transparent-200 cursor-pointer text-4xl">
                        <Link className="text-black " href={'/'}>
                            <div className='font-YsabeauInfant transition-all  hover:drop-shadow-md group-hover:text-purple-500'>
                                Reso
                                <span className='text-purple-500 group-hover:text-black'>
                                    nance
                                </span>
                            </div>                        
                        </Link>
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
                    </div>
                    <div className="flex ml-8 mr-2 w-[120vh] italic text-center justify-around font-medium uppercase transition-all">
                                            
                            <Link className='text-black hover:text-purple-700' href="/">Home</Link>                    
                        
                            <Link className='text-black hover:text-purple-700' href="/">Contact</Link>
                        
                            {session?.user ? (

                                <Link className='flex text-black hover:text-purple-700 normal-case' href="/createfile">
                                    <IoAddCircleOutline/>
                                    Add new directory
                                </Link>
                            ) : (
                                null
                            )}
                        
                        
                    </div>
                    <div className="italic text-lg ml-2 w-32 w-[30vh]">
                        {status !== "authenticated" ? (
                            <div className='flex justify-between'>                              
                                
                                <button
                                className='hover:text-purple-700'
                                onClick={() => signIn()}>
                                    Log In 
                                </button>                            
                            </div>
                        ) : (
                            <div className='flex flex-row justify-between align-center items-center'>
                                
                                    <Dropdown>           
                                        {session.user?.image ? (
                                            <Dropdown.Trigger>
                                                <User
                                                    bordered
                                                    as="button"
                                                    size="lg"
                                                    color="secondary"
                                                    name={session?.user?.name?.slice(0, session.user.name.indexOf(' '))}
                                                    description={session.user.email ? session.user.email : undefined}
                                                    src={session?.user?.image}                                                     
                                                />                                      
                                            </Dropdown.Trigger>

                                        ) : (
                                            <Dropdown.Trigger> 
                                                    <Avatar
                                                        text={session?.user?.name?.slice(0,1)}
                                                        color="secondary" 
                                                        as='button'
                                                        textColor="white" 
                                                    >
                                                        
                                                    </Avatar>                                                
                                            </Dropdown.Trigger>
                                        )}                             
                                        
                                        <Dropdown.Menu aria-label="User Actions"  color='secondary'>
                                            <Dropdown.Item key="identity" css={{ height: "$18" }}>
                                                <Text b color="inherit" css={{ d: "flex" }}>
                                                    Signed in as
                                                </Text>
                                                <Text b color="inherit" css={{ d: "flex" }}>
                                                    {session.user?.email ? session.user.email : null}
                                                </Text>
                                            </Dropdown.Item>
                                            <Dropdown.Item key="profile"><Link className='text-black' href='/dashboard/settings'>Profile</Link></Dropdown.Item>
                                            <Dropdown.Item key="dashboard"><Link className='text-black' href='/dashboard'>Dashboard</Link></Dropdown.Item>
                                            <Dropdown.Item key="directories"><Link className='text-black' href='/dashboard/directories'>Directories</Link></Dropdown.Item>
                                            <Dropdown.Item key="logout" withDivider color="error"><button onClick={()=>signOut()}>Logout</button></Dropdown.Item>
                                        </Dropdown.Menu>                                        
                                    </Dropdown>
                            </div>                            
                        )}
                    </div>
                
            </nav>
            <main className='mx-2 rounded-lg w-full'>

                {props.children}
            </main>
        </>
    )
}

export default Navbar;