"use client"
import {NextPage } from 'next'
// import NewDirectory from './NewDirectory';
// import slides from "./lightbox/slides";
import { Carousel } from './lightbox/Carousel';
import { useSession } from 'next-auth/react'

// interface contentProps {
//     directories : Directory[]
//     user: User
// }

const Content : NextPage = () => {
    const {data: session, status} = useSession()
    return (
        <main className='bg-fibunacci bg-cover bg-no-repeat bg-fixed h-screen'>            
            <Carousel/>
        </main>
    )
}

export default Content;