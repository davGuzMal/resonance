import React, { useEffect, useState, MouseEvent } from 'react'
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
import { Filters } from './Filters'

export const CustomerDirectories = () => {    
    
    const [allDirectories, setAllDirectories] = useState<Directory[] | [] >()
    const [showedDirectories, setShowedDirectories] = useState<Directory[]>()
    const [sense, setSense] = useState('asc')
    const [filters, setFilters] = useState({
      s : '',
      f : '',
      r : false,
      sort : ''      
    })
    const { data: session, status } = useSession()
    const {
        data: directories,
        error: error,
        isLoading : isLoading,
        isSuccess : isSuccess,
        refetch
    } = useQuery(['directories'], ()=>getDirectories(session?.user?.id!, session?.user?.email!))

    
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
    //Use effect for update directories when there is a change
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
          if(aux===undefined) aux = [... allDirectories]
          aux= aux?.filter(d => d.type === filters.f)
          
        }
        if(filters.sort !== '' ){//sort
          if(aux===undefined) aux = [... allDirectories]
                 
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
      if(aux !== undefined) setShowedDirectories(aux)
      else setShowedDirectories(directories)

      console.log(showedDirectories)
      console.log(filters)
    }, [filters])

    //use Effect for save directories in local states once the query has had success
    useEffect(() => {        
        setShowedDirectories(directories)
        setAllDirectories(directories)        
    }, [isSuccess])
    
  return (
    <div className='bg-gray-100 min-h-screen p-4'>
      <div className='font-YsabeauInfant text-xl w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
      <Filters
        filters = {filters}
        setFilters = {setFilters}
      /> 
        <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between'>
          <span><button className='ml-16' value='title' onClick={(e)=>sortBy(e)}>Title</button></span>
          <span className='sm:text-left text-right'><button className='ml-8'>Content</button></span>
          <span className='hidden md:grid'><button value = 'updateDate' onClick={(e)=>sortBy(e)} className='text-left'>Last update</button></span>
          <span className='sm:flex hidden md:grid'><button value = 'type'className='text-left' onClick={(e)=>sortBy(e)}>Type</button></span>
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
