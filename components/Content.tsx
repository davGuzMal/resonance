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
            <main className='bg-fibunacci bg-cover bg-no-repeat bg-fixed bg-right-top h-full xs:w-auto'>
                <div className='flex flex-col space-between rounded-lg'>
                    <div className='font-EduSA bg-gradient-to-r from-blue-100 via-gray-100 w-1/2 h-auto p-4 m-4 rounded-md'>
                        <h2 className='font-EduSA text-3xl md:text-5xl lg:text-6xl mt-16'>What does Resonance mean?</h2>
                        <p className='font-EduSA text-2xl md:text-3xl lg:text-4xl mt-8'>
                        By definition, Resonance is a phenomenon that occurs when the matching 
                        <span className='text-purple-800'> vibrations of something or someone </span>
                        increase the amplitude or strength of an object's oscillations.
                        </p>
                        <p className='font-EduSA text-2xl md:text-3xl lg:text-4xl mt-8'>
                        But what if we are the "object" whose vibration is increased?.
                        Wouldn't it be useful to know what phenomenon may resonate with us?                        
                        </p>
                        
                    </div>      
                    <div className='font-EduSA bg-gradient-to-l from-purple-100 via-blue-100 w-1/2 h-auto p-4 m-4 rounded-md text-right self-end'>
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