"use client"
import {useSession} from 'next-auth/react'

interface HeaderProps  {
    page : string
}

const Header = ({page} : HeaderProps) => {
    const { data: session, status } = useSession()
    return (
        <div className="flex font-YsabeauOffice text-3xl justify-between px-4 pt-4">
            <h2>{page}</h2>
            {status !=='authenticated' ? (
                
                <h2 className='xss:hidden xs:hidden sm:flex'>Welcome back</h2>
            ) : (
                <div>

                <h2 className='xxs:hidden xs:hidden sm:flex'>Welcome back</h2>
                <h2 className='xxs:flex'>
                    {session.user?.name?.slice(0, session.user?.name.indexOf(' ') > 0 ? session.user?.name.indexOf(' ') : session.user?.name.length)}
                </h2>
                </div>
                
            )}
            
        </div>
    )

}

export default Header;