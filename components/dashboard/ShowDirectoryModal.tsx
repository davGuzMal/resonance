import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Directory } from '@/utils/interfaces'


type props = {
    isOpen : any,
    modalDirectory : Directory
    closeModal : ()=>void
}
export const ShowDirectoryModal = ({isOpen, closeModal, modalDirectory} : props) => {
    
    

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
                    {modalDirectory.title}
                  </Dialog.Title>
                  <br/>
                  <Dialog.Description
                  className="text-lg text-justify font-medium leading-6 text-gray-900"
                  >
                  {modalDirectory.content}
                  </Dialog.Description>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 text-right">
                      {modalDirectory.updateDate.toString().slice(0, modalDirectory.updateDate.toString().indexOf('T'))}
                    </p>
                  </div>

                  <div className="mt-4">
                    
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
