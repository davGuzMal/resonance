import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SubmitHandler, useForm } from "react-hook-form";
import {useSession} from 'next-auth/react'
import { alerts, redirectionAlert } from '@/utils/alerts';
import { Directory } from '@/utils/interfaces';
import { createDirectory } from '@/utils/dbQueries';


type props = {
    isOpen : any,    
    closeModal : ()=>void
}

export const CreateDirectoryModal = ({isOpen, closeModal} : props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Directory>({
        defaultValues: {
            type : '',
            title : '',
            content : ''
        }
    });
    const { data: session, status } = useSession() 

    const onSubmit : SubmitHandler<Directory> = async(data) => {
        
             
        data = {
            ...data,
            userId : session?.user?.id!
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
                link: '/dashboard/directories'
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
  return (
    <>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="font-YsabeauInfant relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className='flex justify-end'>
                        <button
                        type="button"
                        className=" rounded-full border border-transparent bg-gray-200  px-4 py-2 text-sm hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                        >
                        Close
                        </button>
                    </div>
                  <Dialog.Title
                    as="h3"
                    className="text-2xl text-center font-medium leading-6 text-gray-900"
                  >
                    Create new directory
                  </Dialog.Title>
                  <br/>
                  <Dialog.Description
                  className="text-lg text-justify font-medium leading-6 text-gray-900"
                  >
                    <form className="grid grid-cols-2 w-full gap-4 justify-center items-center lg:gap-3"
                            onSubmit={handleSubmit(onSubmit)}>
                        {/* TITLE */}
                        <div className="grid grid-span-1 gap-1 mx-4 items-start justify-center">
                            <label className="label">
                                Title:
                            </label>
                            <input                            
                                {...register('title', {
                                    required: true,
                                })}
                                className="ring-2 ring-purple-300 ring-inset rounded-lg "
                            />
                            {errors.title?.type === 'required' ? (
                                <p className="text-red-500 text-xs italic">
                                    Title is mandatory
                                </p>
                            ) : null}                        
                        </div>
                        {/* TYPE */}
                        <div className="grid grid-span-1 gap-1 mx-4 items-start justify-center">
                            <label className="label">
                                Type:
                            </label>
                            <select
                                placeholder="Type"
                                {...register('type', {
                                    required: true,
                                })}
                                className="ring-2 ring-purple-300 ring-inset rounded-lg "
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
                        <div className='grid grid-span-2 gap-1 col-span-2 mx-2 items-start justify-center'>
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
                                className="justify-center text-center bg-purple-400 py-3 my-2 rounded-md shadow-xl font-bold uppercase font-YsabeauInfant hover:bg-purple-800 hover:text-white transition-all">
                                Save Directory
                            </button>
                        
                    </form>
                  </Dialog.Description>
                  

                  {/* <div className="mt-4">
                  <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </>
  )
}
