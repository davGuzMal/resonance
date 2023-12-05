"use client"
import { SessionProvider } from 'next-auth/react';
import RegistrationForm from '@/components/RegistrationForm';
import type { NextPage } from 'next'
import Navbar from '@/components/Navbar';

const Registration : NextPage = () => {

    return (
        <SessionProvider>
            <Navbar>

                <RegistrationForm/>
            </Navbar>
        </SessionProvider>            
        
    )
}

export default Registration;