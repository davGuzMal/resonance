"use client"
import {NextPage } from 'next'
import NewDirectory from './NewDirectory';

import slides from "./lightbox/slides";

import { Carousel } from './lightbox/Carousel';

// interface contentProps {
//     directories : Directory[]
//     user: User
// }

const Content : NextPage = () => {
    // const { data: session, status } = useSession()    
    // const {openLightbox, renderLightbox } = ShowLightBox();
    
    // useEffect(()=>{
    //     openLightbox()
    // }, [])
    return (
        <main className='bg-fibunacci bg-cover bg-no-repeat bg-fixed h-screen'>
            <Carousel/>
            {/* {renderLightbox({ slides })}         */}
            {/* <NewDirectory/>          */}
            
        </main>
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