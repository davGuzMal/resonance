import React, { ChangeEvent, MouseEvent, Dispatch } from 'react'

type props = {
    filters : any,
    setFilters : Dispatch<React.SetStateAction<{
        s: string;
        f: string;
        r: boolean;
        sort: string;
    }>>
}

export const Filters = ({filters, setFilters} : props) => {

    const search = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // if(e.target.value !== ''){
            if(e.target.name === 'search')
                setFilters({
                    ...filters,
                    s : e.target.value
                })
            else if (e.target.name === 'filter'){
                setFilters({
                    ...filters,
                    f : e.target.value
                })
            }
            else if (e.target.name === 'reset'){
                setFilters({
                    ...filters,
                    r : true
                })
            }             
    }
    const reset = (e : MouseEvent<HTMLButtonElement>) => {
        if (e.target.name === 'reset'){
            setFilters({
                ...filters,
                r : true
            })
        }  
    }
  return (
    <div  className='flex justify-around bg-gray-200 p-4 rounded-lg'>
        <input className='rounded-lg w-1/2' onChange={(e)=>search(e)} placeholder='Search by name or description' type ='text' name='search'/>
        <select className='rounded-lg' onChange={(e)=>search(e)} name='filter'>
            <option value='NOTE'>Note</option>
            <option value='JOURNAL'>Journal</option>
            <option value='CONFESSION'>Confession</option>
            <option value='LETTER'>Letter</option>
            <option value='PERSONAL'>Personal</option>
            <option value='BUSINESS'>Business</option>
        </select>
        <button className='rounded-lg w-[100px] bg-purple-800 text-white hover:bg-purple-500 hover:text-black' onClick={(e)=>reset(e)} name='reset'>Reset</button>
    </div>
  )
}
