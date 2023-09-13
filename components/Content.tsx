"use client"
import {NextPage } from 'next'
// import NewDirectory from './NewDirectory';
// import slides from "./lightbox/slides";
import { Carousel } from './lightbox/Carousel';

// interface contentProps {
//     directories : Directory[]
//     user: User
// }

const Content : NextPage = () => {    
    return (
        <main className='bg-fibunacci bg-cover bg-no-repeat bg-fixed h-screen'>
            <Carousel/>
        </main>
    )
}

export default Content;