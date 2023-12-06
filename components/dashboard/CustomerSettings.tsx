import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from 'next-auth/react'
import { User } from "@/utils/interfaces";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { updateUser } from "@/utils/dbQueries";
import { alerts, redirectionAlert } from "@/utils/alerts";

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
        console.log(updatedUser)
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
    <div className="flex justify-between bg-gray-100 min-h-screen p-4">
      <div>

      </div>
      {status !== 'authenticated' ? (
        <div>
          <h1 className="font-YsabeauOffice italic text-3xl"> Please LogIn your account to modify settings</h1>
        </div>
      ) : session.user?.email ? (

        <div className="flex justify-end">

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-1 mt-16 mr-16 items-start justify-start w-[70vh]">
                <label className="grid-span-1 font-YsabeauOffice italic text-xl mx-4">
                    Full Name:
                </label>
                <input
                    placeholder={session.user?.name!}              
                    // value = {session.user?.name!}
                    {...register('name', {
                        required: true,
                    })}
                    className="font-YsabeauOffice italic text-xl mr-4 min-w-[40vh]"

                />
                {errors.name?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Name is mandatory
                    </p>
                ) : null}                        
            </div>
            <div className="grid grid-cols-2 gap-1 mt-4 mr-16 items-start justify-start w-[70vh]">
                <label className="grid-span-1 font-YsabeauOffice italic text-xl ml-4">
                    Email:
                </label>
                <input
                    placeholder={session.user?.email!}
                    // value = {session.user?.email!}
                    {...register('email', {
                        required: true,
                    })}
                    className="font-YsabeauOffice italic text-xl mr-4 min-w-[40vh]"

                />
                {errors.email?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Email is mandatory
                    </p>
                ) : null}                        
            </div>
            <div className="grid grid-cols-2 gap-1 mt-4 items-start justify-start w-[70vh]">
              <label className="grid-span-1 font-YsabeauOffice italic text-xl ml-4">
                  Email Verified 
              </label>
              {userAux.emailVerified ? (
                <BsFillCheckCircleFill className='justify-self-center self-center text-green-600'/>
              ) : (
                <MdRadioButtonUnchecked className='justify-self-center self-center text-red-600'/>
              )}
            </div>
            <div className="flex gap-1 mt-4 items-center justify-around w-[70vh]">

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
