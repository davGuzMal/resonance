import React, { useEffect, useState } from 'react'
import {useSession} from 'next-auth/react'
import { Directory } from '@/utils/interfaces'
import { useQuery } from 'react-query'
import { getDirectories } from '@/utils/dbQueries'
import { BiNotepad } from 'react-icons/bi'
import { BsJournalBookmark } from 'react-icons/bs'
import { FaUserSecret } from 'react-icons/fa'
import { SlEnvolopeLetter } from 'react-icons/sl'
import { AiFillLock } from 'react-icons/ai'
import { IoBusinessSharp } from 'react-icons/io5'

export const CustomerDirectories = () => {
    let orderSense=0
    const [showedDirectories, setShowedDirectories] = useState<Directory[]>()
    const { data: session, status } = useSession()
    const {
        data: directories,
        error: error,
        isLoading : isLoading,
        isSuccess : isSuccess,
        refetch
    } = useQuery(['directories'], ()=>getDirectories(session?.user?.id!, session?.user?.email!))

    // console.log(showedDirectories)
    const sortBy = (index: string) => {
      console.log(showedDirectories)
      orderSense === 0 ? orderSense = 1 : orderSense = 0      
      setShowedDirectories( showedDirectories?.sort((a, b) =>{
        switch (index) {
          case 'type':
            if(orderSense === 0){

              if(a.type > b.type){
                return -1
              }
              if(b.type > a.type){
                return 1
              }
              
            }
            else{
              if(a.type > b.type){
                return 1
              }
              if(b.type > a.type){
                return -1
              }
              return 0
            }
            console.log(showedDirectories)
            break;
        
          default:
            break;
        }
        return 0
      }))
    }
    useEffect(() => {    
        refetch
        
    }, [status])
    useEffect(() => {        
        setShowedDirectories(directories)
        
    }, [isSuccess])
  return (
    <div className='bg-gray-100 min-h-screen p-4'>
      <div className='font-YsabeauInfant text-xl w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
        <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between'>
          <span><button>Title</button></span>
          <span className='sm:text-left text-right'><button>Content</button></span>
          <span className='hidden md:grid'><button>Last update</button></span>
          <span className='sm:flex hidden md:grid'><button onClick={()=>sortBy('type')}>Type</button></span>
        </div>
        <ul>
                {showedDirectories?.map((dir, id)=>(
                    <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursos-pointer'>
                        <div className='flex items-center'>
                            <div className='bg-purple-100 p-3 rounded-lg'>
                                {dir.type === 'NOTE' ? (<BiNotepad className='text-purple-800'/>)
                                :dir.type === 'JOURNAL' ? (<BsJournalBookmark className='text-purple-800'/>)
                                :dir.type === 'CONFESSION' ? (<FaUserSecret className='text-purple-800'/>)
                                :dir.type === 'LETTER' ? (<SlEnvolopeLetter className='text-purple-800'/>)
                                :dir.type === 'PERSONAL' ? (<AiFillLock className='text-purple-800'/>)
                                :dir.type === 'BUSINESS' ? (<IoBusinessSharp className='text-purple-800'/>)
                            : null}
                            </div>
                            <p className='pl-4'>{dir.title}</p>
                        </div>
                        <p className='text-gray-600 sm:text-left text-right'>{dir.content.slice(0,20)} ...</p>
                        <p className='hidden md:flex'>{dir.updateDate.toString().slice(0, dir.updateDate.toString().indexOf('T'))}</p>
                        <p className='sm:flex hidden justify-between items-center'>{dir.type}</p>
                    </li>
                ))}
            </ul>
      </div>
    </div>
  )
}
