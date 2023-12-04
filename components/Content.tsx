"use client"
import {NextPage } from 'next'
// import NewDirectory from './NewDirectory';
// import slides from "./lightbox/slides";
import { Carousel } from './lightbox/Carousel';
// import { useSession } from 'next-auth/react'

// interface contentProps {
//     directories : Directory[]
//     user: User
// }

const Content : NextPage = () => {
    // const {data: session, status} = useSession()
    return (
            <main className='bg-fibunacci bg-cover bg-no-repeat bg-fixed bg-right-top h-full'>
                <div className='flex flex-col space-between rounded-lg'>      
                    <div className='font-EduSA bg-gradient-to-r from-blue-100 via-gray-100 w-1/2 h-[65vh] p-4 m-4'>
                        <p className='font-EduSA text-6xl mt-16'>"The all is mind; the  
                        <span className='text-purple-800'> Universe</span> is mental"</p>
                        <h1 className='text-xl mt-8 text-right mr-8'>First Hermetic Principle</h1>
                    </div>         
                    <Carousel/>
                </div>
            </main>
    )
}

export default Content;