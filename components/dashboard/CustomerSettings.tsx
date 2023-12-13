import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from 'next-auth/react'
import { User } from "@/utils/interfaces";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { updateUser } from "@/utils/dbQueries";
import { alerts, redirectionAlert } from "@/utils/alerts";
import Image from 'next/image';

const CustomerSettings = () => {

  const {data: session, status} = useSession()
  const userAux : User = session?.user as User
  const { register, handleSubmit, formState: { errors }, reset } = useForm<User>({
    defaultValues: {
        id : '',
        name : '',
        email : '',
        emailVerified: new Date()
    }
});   
  const onSubmit : SubmitHandler<User> = async(data) => {
    data = {
      ...data,
      id : userAux.id,
      emailVerified : userAux.emailVerified
  }
    console.log(data)
             
    const updatedUser = await updateUser(data)
    if(updatedUser){
        
        redirectionAlert({
                icon: 'info',
            title: '<strong>User update</strong>',
            html: 'Your information have been successfully updated '+data.name,
            confirmButtonText: 'Got it!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            link: '/dashboard'
        })
    }
    else{
        alerts({
            icon : 'error',
            title : 'Something went wrong',
            text : updatedUser.message
          })
    }
    
}

  return (
    
      <div className="flex w-auto">
      
      {status !== 'authenticated' ? (
        <div>
          <h1 className="font-YsabeauOffice italic text-3xl"> Please LogIn your account to modify settings</h1>
        </div>
      ) : session.user?.email ? (

        <div className="flex w-auto">
          <Image
          className="mx-16 rounded-lg hidden lg:flex"          
          alt="resonanceLogo"
          src="/img/resonanceApp.png"
          width={408}
          height={214}
          />
          <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-1 mt-16 mr-16 items-start justify-around max-w-[70vh] w-auto">
                <label className="flex font-YsabeauOffice italic md:text-xl text-lg">
                    Full Name:
                </label>
                <input
                    placeholder={session.user?.name!}
                    {...register('name', {
                        required: true,
                    })}
                    className="font-YsabeauOffice italic mr-4 md:text-xl text-lg w-auto min-w-[43vh] border rounded-md border-purple-300"

                />
                {errors.name?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Name is mandatory
                    </p>
                ) : null}                        
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-1 mt-4 mr-16 items-start justify-around max-w-[70vh] w-auto">
                <label className="grid-span-1 font-YsabeauOffice italic md:text-xl text-lg">
                    Email:
                </label>
                <input
                    placeholder={session.user?.email!}                    
                    value = {session.user?.email!}
                    {...register('email', {
                        required: true,
                    })}
                    className="font-YsabeauOffice italic mr-4 md:text-xl text-lg w-auto min-w-[43vh] border rounded-md border-purple-300"
                    
                />
                {errors.email?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Email is mandatory
                    </p>
                ) : null}                        
            </div>
            <div className="flex gap-1 mt-4 items-start justify-between max-w-[70vh] w-auto">
              <label className="flex font-YsabeauOffice italic md:text-xl text-lg">
                  Email Verified 
              </label>
              {userAux.emailVerified ? (
                <BsFillCheckCircleFill className='justify-self-center self-center text-green-600'/>
              ) : (
                <MdRadioButtonUnchecked className='justify-self-center self-center text-red-600'/>
              )}
            </div>
            <div className="flex gap-1 mt-4 items-center justify-around w-auto max-w-[40vw]">

              {!userAux.emailVerified ? 
              <button className="border rounded-lg bg-green-500 hover:bg-green-700 text-white p-4 font-YsabeauOffice italic justify-self-center">Verify your email</button>
              : null}
              <button className='border rounded-lg bg-purple-700 text-white p-4 font-YsabeauOffice italic justify-self-center' type='submit'>Save changes</button>
            </div>
          </form>
        </div>
      ) : (
        null
      )}
    </div>
  )
}

export default CustomerSettings;
