import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma";

const bcrypt = require('bcrypt')

export async function GET (request: Request){
    try {
        const users = await prisma.user.findMany({
            select : {
                id : true,
                name : true,
                email : true,
                emailVerified : true,
                directories : {
                    select : {
                        title: true,
                        type : true,
                        updateDate : true
                    }
                }
                    
            }
        })
        if(users){
            return NextResponse.json({users}, { status : 200})
        }
        else{
            NextResponse.json({message: "No users found"}, { status:401} )
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error: " + error })
    }
}

export async function PUT(request: Request) {


    const {
        id,
        name,
        email,
                         
    } = await request.json()  
    
      
    try {
        const user = await prisma.user.update({
            where : {
                id : id
            },
            data : {
                name : name,
                email : email
            }
        })
        if(user) {
            return NextResponse.json({user}, {status:200} )
        }
        else {

            return NextResponse.json({message: "It seems that something went wrong, please try again" }, {status: 401})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error: " + error })
    }
}