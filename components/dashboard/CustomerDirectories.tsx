import React, { useEffect, useState, MouseEvent } from 'react'
import {useSession} from 'next-auth/react'
import {Tooltip} from "@nextui-org/react";
import { Directory } from '@/utils/interfaces'
import { useQuery } from 'react-query'
import { getDirectories } from '@/utils/dbQueries'
import { BiNotepad } from 'react-icons/bi'
import { BsJournalBookmark } from 'react-icons/bs'
import { FaUserSecret } from 'react-icons/fa'
import { SlEnvolopeLetter } from 'react-icons/sl'
import { AiFillLock } from 'react-icons/ai'
import { IoBusinessSharp, IoAddCircleOutline } from 'react-icons/io5'
import { Filters } from './Filters'
import { ShowDirectoryModal } from './ShowDirectoryModal'
import { CreateDirectoryModal } from './CreateDirectoryModal';



export const CustomerDirectories = () => {    
    
  //Directories
    const [allDirectories, setAllDirectories] = useState<Directory[] | [] | Array<any>>()
    const [showedDirectories, setShowedDirectories] = useState<Directory[]>()
    //Filters
    const [sense, setSense] = useState('asc')
    const [filters, setFilters] = useState({
      s : '',
      f : '',
      r : false,
      sort : ''      
    })
    //user session
    const { data: session, status } = useSession()
    //Query to get directories from db
    const {
        data: directories,
        error: error,
        isLoading : isLoading,
        isSuccess : isSuccess,
        refetch
    } = useQuery(['directories'], ()=>getDirectories(session?.user?.id!, session?.user?.email!))
    //open modal to see directory content
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [modalDirectory, setModalDirectory] = useState<Directory>({
      id: '',
      userId: '',
      title: '',
      type: '',
      content: '',
      updateDate: new Date()

    })
    //Open and Close modal to create directories
    function openModalAdd (){
      setIsOpenAdd(true)      
    }
    function closeModalAdd() {
      setIsOpenAdd(false)
    } 
    //Open and Close modal to show directories
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

    //Determine sort parameters
    const sortBy = (e : MouseEvent<HTMLButtonElement>) => {
      if(sense === 'asc') {
        setSense('desc')
      } 
      else {
        setSense('asc')
      }       
      setFilters({
        ... filters,
        sort: e.target.value
      })      
    }
    //Use effect for update directories when there is a change in session status
    useEffect(() => {    
        refetch
        
    }, [status])
    //Use effect to visualize directories after filter or sort
    useEffect(() => {
      let aux : Directory[] | Array<any> | undefined
      
      if(filters.r === true){
        setShowedDirectories(directories)
        setFilters({
          s : '',
          f : '',
          r : false,
          sort : ''      
        })
      }
      else{

        if(filters.s !== ''){//filter by search title or content
          aux = allDirectories?.filter(d => 
            d.title.toLocaleLowerCase().indexOf(filters.s.toLocaleLowerCase()) >= 0 ||
            d.content.toLocaleLowerCase().indexOf(filters.s.toLocaleLowerCase()) >= 0 ||
            d.type === filters.f
          )        
        }
        if(filters.f !== ''){//filter by type
          
          if(aux===undefined) aux = allDirectories?.map(d => d)
          aux= aux?.filter(d => d.type === filters.f)         
        }
        if(filters.sort !== '' ){//sort
          if(aux===undefined) aux = [... allDirectories as Array<any>]
                 
          aux?.sort((a, b) => {
            if(sense === 'asc'){
  
              if(a[filters.sort] > b[filters.sort]){
                return -1
              }
              if(b[filters.sort] > a[filters.sort]){
                return 1
              }
              
            }
            else{
              if(a[filters.sort] > b[filters.sort]){
                return 1
              }
              if(b[filters.sort] > a[filters.sort]){
                return -1
              }            
            }
            return 0
          }
          )
        }
      }
      if(aux !== undefined) {        
        
        setShowedDirectories(aux)        
      }
      else {

        setShowedDirectories(directories)    
      }      
    }, [filters])    

    //use Effect for save directories in local states once the query has had success
    useEffect(() => {
      
      setAllDirectories(directories) 
      setShowedDirectories(directories)              
    }, [isSuccess])
    
  return (
    <>
        {isLoading ? <h1>Loading...</h1>
        :
        <div className='bg-gray-100 min-h-screen p-4'>      
          <div className='font-YsabeauInfant text-xl w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <Filters
            filters = {filters}
            setFilters = {setFilters}
          /> 
            <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between'>
              <span className='flex'>
                <Tooltip color='secondary' placement='top' offset={-2} content={
                  <div className='font-YsabeauOffice'>Add new directory</div>
                }>              
                  <IoAddCircleOutline className='text-purple-800 text-3xl' name='add' onClick={openModalAdd}/>             
                </Tooltip>
                <button className='ml-16' value='title' onClick={(e)=>sortBy(e)}>Title</button>
              </span>
              <span className='sm:text-left text-right'><button className='ml-8'>Content</button></span>
              <span className='hidden md:grid'><button value = 'updateDate' onClick={(e)=>sortBy(e)} className='text-left'>Last update</button></span>
              <span className='sm:flex hidden md:grid'><button value = 'type'className='text-left' onClick={(e)=>sortBy(e)}>Type</button></span>
            </div>
            <ShowDirectoryModal
              isOpen = {isOpen}
              closeModal = {closeModal}
              modalDirectory = {modalDirectory}
            />
            <CreateDirectoryModal
              isOpen = {isOpenAdd}
              closeModal = {closeModalAdd}
            />
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
                            <p className='text-gray-600 sm:text-left text-right'><button name='show'onClick={()=>openModal(dir)}>{dir.content.slice(0,20)} ...</button></p>
                            <p className='hidden md:flex'>{dir.updateDate.toString().slice(0, dir.updateDate.toString().indexOf('T'))}</p>
                            <p className='sm:flex hidden justify-between items-center'>{dir.type}</p>
                        </li>
                    ))}
                </ul>
          </div>
        </div>
      }
    
    </>
  )
}
