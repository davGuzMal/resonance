import React, { useEffect } from 'react'
import {useSession} from 'next-auth/react'
import { getDirectories } from '@/utils/dbQueries'
import { useQuery } from 'react-query'

export const TopCards = () => {
    const { data: session, status } = useSession()    
    const {
        data: directories,
        error: error,
        isLoading : isLoading,
        isSuccess : isSuccess,
        refetch
    } = useQuery(['directories'], ()=>getDirectories(session?.user?.id!, session?.user?.email!))
    
    

    useEffect(() => {
        refetch()
    }, [isLoading])
  return (
      <main>
    {isLoading ? (
        <h2>Loading...</h2>
    ):(
        <div className='grid lg:grid-cols-6 gap4 p-4'>
            
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>Notes</p>
                    <p className='text-gray-600'>Last update : </p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                    <span className='text-green-700 text-lg'>{directories?.filter(dir => dir.type ==='NOTE').length}</span>
                </p>
            </div>
            
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>Journal</p>
                    <p className='text-gray-600'>Last update : </p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                    <span className='text-green-700 text-lg'>{directories?.filter(dir => dir.type ==='JOURNAL').length}</span>
                </p>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>Confession</p>
                    <p className='text-gray-600'>Last update : </p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                    <span className='text-green-700 text-lg'>{directories?.filter(dir => dir.type ==='CONFESSION').length}</span>
                </p>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>Letter</p>
                    <p className='text-gray-600'>Last update : </p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                    <span className='text-green-700 text-lg'>{directories?.filter(dir => dir.type ==='LETTER').length}</span>
                </p>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>Business</p>
                    <p className='text-gray-600'>Last update : </p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                    <span className='text-green-700 text-lg'>{directories?.filter(dir => dir.type ==='BUSINESS').length}</span>
                </p>
            </div>
            <div className='flex bg-white justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>Personal</p>
                    <p className='text-gray-600'>Last update : </p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                    <span className='text-green-700 text-lg'>{directories?.filter(dir => dir.type ==='PERSONAL').length}</span>
                </p>
            </div>
        </div>
    )}
    </main>
  )
}
