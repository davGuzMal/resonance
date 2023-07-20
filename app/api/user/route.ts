import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma";

const bcrypt = require('bcrypt')
export async function POST(request: Request) {


    const {
        name,
        email,
        password                 
    } = await request.json()  
    
    const hash = await bcrypt.hash(password, 10);    
    try {
        const alreadyUser = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        if(alreadyUser) {
            return NextResponse.json({ state:401, message: "There already exist a registered user with this email, please go to LogIn page" })
        }
        else {

            if(hash){
                const newUser = await prisma.user.create({
                    data : {
                        name : name,
                        email : email,
                        password : hash
                    }
                })
                return NextResponse.json({ newUser })
            }
            else{
                return NextResponse.json({ state:401, message: "It seems that something went wrong, please try again" })
            }
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error: " + error })
    }
}