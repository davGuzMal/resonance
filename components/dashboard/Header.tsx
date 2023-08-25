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
                
                <h2>Welcome back</h2>
            ) : (
                <h2>Welcome back, {session.user?.name?.slice(0, session.user?.name.indexOf(' '))}</h2>
            )}
            
        </div>
    )

}

export default Header;