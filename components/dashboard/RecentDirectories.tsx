import React, { useEffect, useState } from 'react'
// import {useSession} from 'next-auth/react'
import { getDirectories } from '@/utils/dbQueries'
import { useQuery } from 'react-query'
import { BiNotepad } from 'react-icons/bi'
import { BsJournalBookmark } from 'react-icons/bs'
import { FaUserSecret } from 'react-icons/fa'
import { SlEnvolopeLetter } from 'react-icons/sl'
import { AiFillLock } from 'react-icons/ai'
import { IoBusinessSharp } from 'react-icons/io5'
import { Directory } from '@/utils/interfaces'
import { ShowDirectoryModal } from './ShowDirectoryModal'

type props = {
    session : any
}

export const RecentDirectories = ({ session } : props) => {
       
    //state to store recent directories and modal to show directory
    const [recentDir, setRecentDir] = useState<Directory[]>()
    const [isOpen, setIsOpen] = useState(false)
    const [modalDirectory, setModalDirectory] = useState<Directory>({
        id: '',
        userId: '',
        title: '',
        type: '',
        content: '',
        updateDate: new Date()
  
      })
    //query to bring out directories
    const {
        data: directories,
        error: error,
        isLoading : isLoading,
        isSuccess : isSuccess,
        refetch
    } = useQuery(['directories'], ()=>getDirectories(session?.user?.id!, session?.user?.email!))
    
    //open and close modal to show directory
    function closeModal() {
        setIsOpen(false)
      }  
      function openModal(directory : Directory = modalDirectory) {   
          setModalDirectory({
            ...modalDirectory,
            id: directory.id,
            userId: directory.userId,
            title: directory.title,
            type: directory.type,
            content: directory.content,
            updateDate: directory.updateDate
          })
          setIsOpen(true)
      }
    //set period for recent directories, currently 15 days
    const today = new Date()
    const recentDays = new Date(today.getFullYear(),today.getMonth(), today.getDate()-15)
    
    //Use effect for save recent directories in local state
    useEffect(()=>{
        setRecentDir(directories?.filter(dir => new Date(dir.updateDate)>recentDays))
    }, [isSuccess])
  return (
    <>
    
        {isLoading ? null :
        (

        <div className='w-full col-span-1 relative md:h-[50vh] h-[40vh] m-auto p-4 rounded-lg bg-white overflow-scroll'>            
            <h1>
                <ul>
                    {recentDir?.map((dir, id) => (
                        <li key={id} onClick={()=>openModal(dir)} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
                            <div className='bg-purple-100 rounded-lg p-3'>
                                {dir.type === 'NOTE' ? (<BiNotepad className='text-purple-800'/>)
                                :dir.type === 'JOURNAL' ? (<BsJournalBookmark className='text-purple-800'/>)
                                :dir.type === 'CONFESSION' ? (<FaUserSecret className='text-purple-800'/>)
                                :dir.type === 'LETTER' ? (<SlEnvolopeLetter className='text-purple-800'/>)
                                :dir.type === 'PERSONAL' ? (<AiFillLock className='text-purple-800'/>)
                                :dir.type === 'BUSINESS' ? (<IoBusinessSharp className='text-purple-800'/>)
                            : null}
                            </div>
                            <div className='flex flex-col w-full'>
                                <h2 className='font-bold text-xl'>{dir.title}</h2>
                                <p className='text-right text-xs text-purple-800 italic'>{dir.type}</p>
                            </div>
                            <ShowDirectoryModal
                                isOpen = {isOpen}
                                closeModal = {closeModal}
                                modalDirectory = {modalDirectory}
                            />
                        </li>
                        
                    ))}
                </ul>
            </h1>
        </div>
        )}
    </>
  )
}
