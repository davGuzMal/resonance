"use client"
import type { NextPage } from 'next'
import  NewDirectory  from "../../components/NewDirectory"
import Navbar from '@/components/Navbar';
import Layout from '@/components/Layout';
// import createDB from '@/utils/createBD';

const CreateFile : NextPage = () => {
  return (    
    <Layout>
      <Navbar>
        <NewDirectory/>
      </Navbar>    
    </Layout>
  )
}

export default CreateFile;