import React, { useEffect } from 'react'
import {useSession} from 'next-auth/react'
import { getDirectories } from '@/utils/dbQueries'
import { Directory, Type } from '@/utils/interfaces'
import { useQuery } from 'react-query'
import Link from 'next/link'
import { Session } from '@auth0/nextjs-auth0'

type props = {
    session : any
}

export const TopCards = ({ session } : props) => {
    
    const type : string[] = ["NOTE", "JOURNAL", "CONFESSION", "LETTER", "PERSONAL", "BUSINESS"]
    const {
        data: directories,
        error: error,
        isLoading : isLoading,
        isSuccess : isSuccess,
        refetch
    } = useQuery(['directories'], ()=>getDirectories(session?.user?.id!, session?.user?.email!))
    
    const getMostRecentUpdate = (array : Directory[]) => {
        if (array?.length){

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
   
  return (
      <main>
    {isLoading ? (
        <h2>Loading...</h2>
    ):(
        <div className='grid lg:grid-cols-6 gap4 p-4'>
            {type.map(t =>            
                <Link href={{
                    pathname : "/dashboard/directories",
                    query : { preFilter : t}
                }}
                className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                    {/* <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'> */}
                        <div className='flex flex-col w-full pb-4'>
                            <p className='text-black text-2xl font-bold'>{t}</p>
                            <p className='text-gray-600'>Last update : {getMostRecentUpdate(directories?.filter(dir => dir.type === t) as Directory[])}</p>
                        </div>
                        <p className='bg-purple-200 flex justify-center items-center p-2 rounded-lg h-1/2'>
                            <span className='text-purple-700 text-lg'>{directories?.filter(dir => dir.type === t).length}</span>
                        </p>
                    {/* </div> */}
                </Link>
            )}           
            
        </div>
    )}
    </main>
  )
}
