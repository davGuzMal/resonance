import * as React from "react";
import { NextComponentType } from 'next'
import { SubmitHandler, useForm } from "react-hook-form";
import { NewUser } from "@/utils/interfaces";
import { createUser } from "@/utils/dbQueries";
import { alerts, redirectionAlert } from "@/utils/alerts";

const RegistrationForm : NextComponentType = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewUser>({
    defaultValues: {
        name : '',
        email : '',
        password : ''
    }
});
 
  const onSubmit : SubmitHandler<NewUser> = async(data) => {    
    
    const newUser = await createUser(data)    
    if(!newUser.message){

      redirectionAlert({
        icon: 'info',
        title: '<strong>New user created</strong>',
        html: data.name +
            ' your user has been successfully created, please hit LogIn button to' +
            ' access your account.',
        confirmButtonText: 'Log in',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        link: '/api/auth/signin'
      })
    }
    else{
      alerts({
        icon : 'error',
        title : 'Something went wrong',
        text : newUser.message
      })
    }
  }

  return (
    <div className="p-8 flex flex-col justify-evenly items-center bg-blue-100 rounded-lg md:flex-col">
      <div className="w-full flex gap-4 justify-center items-center md:w-3/6">
              
          <p className="text-md mb-2 md:text-xl md:text-center">
              Please fill the following data to register
          </p>
      </div>
      <form className="w-full grid grid-cols-2 gap-2 items-center justify-center w-1/2 lg:gap-3"
              onSubmit={handleSubmit(onSubmit)}>
          {/* NAME */}
          <div className="flex flex-col gap-1 mx-4 items-start justify-center">
              <label className="label">
                  Name:
              </label>
              <input
                  placeholder="Name"
                  {...register('name', {
                      required: true,
                  })}
                  className="input"
              />
              {errors.name?.type === 'required' ? (
                  <p className="text-red-500 text-xs italic">
                      Name is mandatory
                  </p>
              ) : null}                        
          </div>
          {/* EMAIL */}
          <div className="flex flex-col gap-1 mx-4 items-start justify-center">
              <label className="label">
                  Email:
              </label>
              <input
                  placeholder="Email"
                  {...register('email', {
                      required: true,
                  })}
                  className="input"
              />
              
              {errors.email?.type === 'required' ? (
                  <p className="text-red-500 text-xs italic">
                      Email is mandatory
                  </p>
              ) : null}                        
          </div>
          {/* PASSWORD */}
          <div className='flex flex-col gap-1 col-span-2 mx-2 items-start justify-center'>
          <label className="label">
                  Password
              </label>
              <input 
                  {...register('password', {
                      required: true,
                  })}
                  className='input '
                  type="password"/>
                      
              
              {errors.password?.type === 'required' ? (
                  <p className="text-red-500 text-xs italic">
                      Password is mandatory
                  </p>
              ) : null}  
          </div>
          <button
              type="submit"
              className="text-center bg-blue-400 py-3 my-2 rounded-md shadow-xl text-pwgreen-50 font-bold uppercase font-Rubik hover:bg-pwgreen-800 transition-all">
              Registration
          </button>
      </form>
  </div>
  )
}

export default RegistrationForm;