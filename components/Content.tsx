"use client"
import {NextPage } from 'next'
import NewDirectory from './NewDirectory';
import { useSession} from 'next-auth/react'
import { useState } from 'react';
import { useQuery } from 'react-query'
import { getUser } from '@/utils/dbQueries';
import Navbar from './Navbar';

// interface contentProps {
//     directories : Directory[]
//     user: User
// }

const Content : NextPage = () => {
    const { data: session, status } = useSession()
    console.log(session)
    const id = "d74eb683-7621-488e-84e5-efbcb3b2feba"
    const {
        data: user,
        error,
        isLoading,
        isSuccess
    } = useQuery(['user'], ()=>getUser(id))

    // const {
    //     data: directories,
    //     error: errorD,
    //     isLoading : isLoadingD,
    //     isSuccess : isSuccessD
    // } = useQuery(['directories'], ()=>getDirectories(id))
    
    
    
    
    return (
        <div>
            <Navbar/>

            <NewDirectory/>
            <div>

                <h1>Hello {session?.user?.name}</h1>
                <p>Your actual directories are:</p>
                <ul>
                    { isLoading ? (<p>Loading...</p>
                    ) : user?.directories ? (user.directories.map((dir, i) =>
                        <li key={i}>{dir.title}</li>)
                    ) : (null)}
                </ul>
            </div>
        </div>
    )
}

// export const getStaticProps: GetStaticProps = async() => {
//     let directories
//     const user = await prisma.user.findUniqueOrThrow({
//         where : {
//             id : "d74eb683-7621-488e-84e5-efbcb3b2feba",
//         }
//     }) as User
    
//     if (user) {

//         directories = await prisma.directories.findMany({
//             where: {
//               userId: "d74eb683-7621-488e-84e5-efbcb3b2feba",
//             },
//           }) as Directory[]
//     }
//     else {
//         directories = "No"
//     }
//     console.log(directories)
//     return{
//         props :{
//             user,
//             directories 
//         }
//     }
//   }

export default Content;