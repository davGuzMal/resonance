"use client"
import type { NextPage } from 'next'
import  Content  from "../components/Content"
import Navbar from '@/components/Navbar';
// import createDB from '@/utils/createBD';

const Home : NextPage = () => {
  // const session = await getServerSession(options)
  // createDB()
  // const queryClient = new QueryClient()
  return (
    <Navbar>
      <Content/>
    </Navbar>
        
  )
}

export default Home;