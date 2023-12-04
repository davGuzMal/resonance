"use client"
import type { NextPage } from 'next'
import  Content  from "../components/Content"
import Navbar from '@/components/Navbar';
import Layout from '@/components/Layout';
// import createDB from '@/utils/createBD';

const Home : NextPage = () => {
  // const session = await getServerSession(options)
  // createDB()
  // const queryClient = new QueryClient()
  return (
    <Layout>
      <Navbar>
        <Content/>
      </Navbar>
    </Layout>        
  )
}

export default Home;