"use client"
import type { NextPage } from 'next'
import  NewDirectory  from "../../components/NewDirectory"
import Navbar from '@/components/Navbar';
// import createDB from '@/utils/createBD';

const CreateFile : NextPage = () => {
  return (    
          <Navbar>
            <NewDirectory/>
          </Navbar>    
  )
}

export default CreateFile;