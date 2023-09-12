import { getAllUsers } from '@/utils/dbQueries'
import { Directory } from '@/utils/interfaces'
import React, { useEffect } from 'react'
import { BsPersonFill, BsThreeDotsVertical, BsFillCheckCircleFill } from 'react-icons/bs'
import { MdRadioButtonUnchecked } from 'react-icons/md'
import { useQuery } from 'react-query'

export const CustomerList = () => {
    const {
        data: users,
        error: error,
        isLoading : isLoading,
        isSuccess : isSuccess,
        refetch
    } = useQuery(['users'], ()=>getAllUsers())
    
    const getMostRecentUpdate = (array : Directory[]) => {
        if (array.length){

            const dates = array.map(el => el.updateDate)
            let mxDate = dates.reduce(function (a, b) {
                return a > b ? a : b;
            });
            return mxDate.toString().slice(0, mxDate.toString().indexOf('T'))
        }
        else{
            return null
        }
    }

    useEffect(()=>{
        refetch()
    }, [isLoading])
  return (
    <div className='bg-gray-100 min-h-screen p-4'>
        <div className='font-YsabeauInfant text-xl w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
            <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between'>
                <span className='ml-16'>Name</span>
                <span className='sm:text-left text-right ml-8'>Email</span>
                <span className='hidden md:grid'>Last Directory</span>
                <span className='hidden md:grid'>Account verified</span>
            </div>
            <ul>
                {users?.map((user, id)=>(
                    <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursos-pointer'>
                        <div className='flex items-center'>
                            <div className='bg-purple-100 p-3 rounded-lg'>
                                <BsPersonFill className='bg-purple-800'/>
                            </div>
                            <p className='pl-4'>{user.name}</p>
                        </div>
                        <p className='text-gray-600 sm:text-left text-right'>{user.email}</p>
                        <p className='hidden md:flex'>{getMostRecentUpdate(user.directories)}</p>
                        <div className='sm:flex hidden justify-between items-center ml-16'>                            
                            {user.emailVerified 
                            ? <BsFillCheckCircleFill className='text-green-600'/>
                            : <MdRadioButtonUnchecked className='text-red-600'/>}
                            <BsThreeDotsVertical/>                            
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}
