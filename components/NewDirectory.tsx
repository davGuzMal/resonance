"use client";
import { Directory, User } from '@/utils/interfaces';
import { createDirectory } from '../utils/dbQueries';
import { NextComponentType } from 'next'
import {signIn, useSession} from 'next-auth/react'
import { SubmitHandler, useForm } from "react-hook-form";
import { alerts, redirectionAlert } from '@/utils/alerts';
import Link from 'next/link';

const NewDirectory : NextComponentType = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Directory>({
        defaultValues: {
            type : '',
            title : '',
            content : ''
        }
    });
    const { data: session, status } = useSession()     
    
    const onSubmit : SubmitHandler<Directory> = async(data) => {
        
        const userAux : User = session?.user as User
        data = {
            ...data,
            userId : userAux.id
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
    if(status === "unauthenticated"){
        return(
            <h1 className="text-3xl font-YsabeauInfant mt-64 md:text-center">
                You are not allowed to create directories, please hit the 
                <span>   </span>
                    <span className="relative">
                        <Link href="/registration">
                            <span className="block absolute -inset-0.5 -skew-y-3 bg-purple-500" aria-hidden="true"></span>
                            <span className="relative text-white hover:text-black">Registration </span>
                        </Link>
                    </span>
                <span>   </span> 
                or the
                <span>   </span>
                    <span className="relative">
                        <button onClick={() => signIn()}>
                            <span className="block absolute -inset-0.5 -skew-y-3 bg-purple-500" aria-hidden="true"></span>
                            <span className="relative text-white hover:text-black">log in </span>
                        </button>
                    </span>
                <span>   </span>                
                button
            </h1>
        )
    }
    return (
        <div className="p-8 flex xxs:flex-col md:flex-row justify-between items-center -inset -skew-y-3 bg-gradient-to-r from-purple-300 via-gray-100 rounded-lg xs:h-[auto]">
            <div className='skew-y-3 font-EduSA bg-gradient-to-r from-blue-100 via-gray-100 w-auto h-auto p-4 m-4 rounded lg'>                
                <p className='text-3xl mt-8'>Journaling helps control your symptoms and improve your mood by:</p>
                <ul className='list-disc mt-8'>
                    <li className='text-xl'>Helping you <span>   </span>
                    <span className="relative">
                        <span className="block absolute -inset-0.5 -skew-y-3 bg-purple-500" aria-hidden="true"></span>
                        <span className="relative text-white">prioritize</span>
                    </span>
                    <span>   </span>
                    problems, fears, and concerns.</li>
                    <li className='text-xl'>Tracking any symptoms day-to-day so that you can <span>   </span>
                    <span className="relative">
                        <span className="block absolute -inset-1 -skew-y-3 bg-purple-500" aria-hidden="true"></span>
                        <span className="relative text-white">recognize</span>
                    </span>
                    <span>   </span>
                    triggers and <span>   </span>
                    <span className="relative">
                        <span className="block absolute -inset-1 -skew-y-3 bg-purple-500" aria-hidden="true"></span>
                        <span className="relative text-white">learn</span>
                    </span>
                    <span>   </span>
                    ways to better control them</li>
                    <li className='text-xl'>Providing an opportunity for <span>   </span>
                    <span className="relative">
                        <span className="block absolute -inset-1 -skew-y-3 bg-purple-500" aria-hidden="true"></span>
                        <span className="relative text-white">positive self-talk</span>
                    </span>
                    <span>   </span>
                    and identifying negative thoughts and behaviors.</li>
                </ul>  
            </div>
            <div className='skew-y-3 p-4 text-lg rounded-lg m-8 font-YsabeauInfant'>

                <div className="w-full gap-4 justify-center items-center">
                        
                    <p className="text-xl font-YsabeauInfant mb-2 md:text-center">
                        Feel safe to know that all your directories are well secured in our 24/7
                        monitored bank-file
                    </p>
                </div>
                {status !=='authenticated' ?
                    <p className='text-3xl mt-8'>Loading...</p>
                    :
                    
                    <form className="grid xs:grid-cols-1 md:grid-cols-2 w-full gap-2 justify-center items-center lg:gap-3"
                            onSubmit={handleSubmit(onSubmit)}>
                        {/* TITLE */}
                        <div className="grid grid-span-1 gap-1 items-start justify-start w-[auto]">
                            <label className="label">
                                Title:
                            </label>
                            <input                            
                                {...register('title', {
                                    required: true,
                                })}
                                className="ring-2 ring-purple-300 ring-inset rounded-lg w-5/6"
                            />
                            {errors.title?.type === 'required' ? (
                                <p className="text-red-500 text-xs italic">
                                    Title is mandatory
                                </p>
                            ) : null}                        
                        </div>
                        {/* TYPE */}
                        <div className="grid grid-span-1 gap-1 mx-2 items-start justify-start w-[auto]">
                            <label className="label">
                                Type:
                            </label>
                            <select
                                placeholder="Type"
                                {...register('type', {
                                    required: true,
                                })}
                                className="ring-2 ring-purple-300 ring-inset rounded-lg w-[auto]"
                                defaultValue="Note"
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
                        <div className='grid xs:grid-span-1 md:grid-span-2 gap-1 xxs:col-span-1 xs:col-span-2 mx-2 items-start justify-center'>
                        <label className="label">
                                Write your content here below:
                            </label>
                            <textarea 
                                {...register('content', {
                                    required: true,
                                })}
                                className='ring-2 ring-purple-300 ring-inset rounded-lg '
                                rows={10}
                                cols={50}>
                                    
                            </textarea>
                            {errors.content?.type === 'required' ? (
                                <p className="text-red-500 text-xs italic">
                                    Content is mandatory
                                </p>
                            ) : null}  
                        </div>
                        <button
                            type="submit"
                            className="grid xxs:col-span-1 xs:col-span-2 text-center bg-purple-400 py-3 my-2 rounded-md shadow-xl uppercase font-YsabeauInfant hover:bg-purple-800 hover:text-white transition-all">
                            Save Directory
                        </button>
                    </form>
                }
            </div>
        </div>
    )
}

export default NewDirectory;