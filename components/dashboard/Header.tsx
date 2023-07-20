"use client"
import {useSession} from 'next-auth/react'


const Header = () => {
    const { data: session, status } = useSession()
    return (
        <div className="flex justify-between px-4 pt-4">
            <h2>Dashboard</h2>
            {status !=='authenticated' ? (
                
                <h2>Welcome back</h2>
            ) : (
                <h2>Welcome back, {session.user?.name?.slice(0, session.user?.name.indexOf(' '))}</h2>
            )}
            
        </div>
    )

}

export default Header;