"use client";
import { Directory } from '@/utils/interfaces';
import { createDirectory, getUser } from '../utils/dbQueries';
import { NextComponentType } from 'next'
import { useQuery } from 'react-query';
import {useSession} from 'next-auth/react'
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from 'react';
import { alerts, redirectionAlert } from '@/utils/alerts';



const NewDirectory : NextComponentType = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Directory>({
        defaultValues: {
            type : '',
            title : '',
            content : ''
        }
    });
    const { data: session, status } = useSession()
    
    const {
        data: user,
        error: error,
        isLoading : isLoading,
        isSuccess : isSuccess,
        refetch
    } = useQuery(['user'], ()=>getUser(session?.user?.email!))
    
    const onSubmit : SubmitHandler<Directory> = async(data) => {
        
        console.log(user)
        
        data = {
            ...data,
            userId : user?.id!
        }
        const newDirectory = await createDirectory(data)
        if(newDirectory){
            console.log(newDirectory)
            redirectionAlert({
                    icon: 'info',
                title: '<strong>New directory created</strong>',
                html: 'You have added a new directory to your '+newDirectory.newDirectory.type+' category',
                confirmButtonText: 'Got it!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                link: '/'
            })
        }
        else{
            alerts({
                icon : 'error',
                title : 'Something went wrong',
                text : newDirectory.newDirectory.message
              })
        }
        
    }
    useEffect(() => {
        refetch()
    }, [isLoading])
    return (
        <div className="p-8 flex flex-col justify-evenly items-center bg-blue-100 rounded-lg md:flex-col">
            <div className="w-full flex gap-4 justify-center items-center md:w-3/6">
                    
                <p className="text-md mb-2 md:text-xl md:text-center">
                    Feel safe to know that all your directories are well secured in our 24/7
                    monitored bank-file
                </p>
            </div>
            <form className="w-full grid grid-cols-2 gap-2 items-center justify-center w-1/2 lg:gap-3"
                    onSubmit={handleSubmit(onSubmit)}>
                {/* TITLE */}
                <div className="flex flex-col gap-1 mx-4 items-start justify-center">
                    <label className="label">
                        Title:
                    </label>
                    <input
                        placeholder="Title"
                        {...register('title', {
                            required: true,
                        })}
                        className="input"
                    />
                    {errors.title?.type === 'required' ? (
                        <p className="text-red-500 text-xs italic">
                            Title is mandatory
                        </p>
                    ) : null}                        
                </div>
                {/* TYPE */}
                <div className="flex flex-col gap-1 mx-4 items-start justify-center">
                    <label className="label">
                        Type:
                    </label>
                    <select
                        placeholder="Type"
                        {...register('type', {
                            required: true,
                        })}
                        className="input"
                    >
                    <option value="NOTE">Note</option>
                    <option value="JOURNAL">Journal</option>
                    <option value="CONFESSION">Confession</option>
                    <option value="LETTER">Letter</option>
                    <option value="PERSONAL">Personal</option>
                    <option value="BUSINESS">Business</option>
                    </select>
                    {errors.type?.type === 'required' ? (
                        <p className="text-red-500 text-xs italic">
                            Type is mandatory
                        </p>
                    ) : null}                        
                </div>
                {/* CONTENT */}
                <div className='flex flex-col gap-1 col-span-2 mx-2 items-start justify-center'>
                <label className="label">
                        Write your content here below:
                    </label>
                    <textarea 
                        {...register('content', {
                            required: true,
                        })}
                        className='input '
                        rows={10}
                        cols={60}>
                            
                    </textarea>
                    {errors.content?.type === 'required' ? (
                        <p className="text-red-500 text-xs italic">
                            Content is mandatory
                        </p>
                    ) : null}  
                </div>
                <button
                    type="submit"
                    className="text-center bg-blue-400 py-3 my-2 rounded-md shadow-xl text-pwgreen-50 font-bold uppercase font-Rubik hover:bg-pwgreen-800 transition-all">
                    Save Directory
                </button>
            </form>
        </div>
    )
}

// export const getStaticProps: GetStaticProps = async(context) => {
//     const directories = await prisma.directories.findMany({
//         where: {
//           userId: "1",
//         },
//       })
//     return{
//         props{
//             directories 
//         }
//     }
//   }


export default NewDirectory;