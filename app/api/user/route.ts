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
            return NextResponse.json({ message: "It seems that something went wrong, please try again" })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error: " + error })
    }
}