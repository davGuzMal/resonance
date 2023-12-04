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
            return NextResponse.json({message: "There already exist a registered user with this email, please go to LogIn page"}, { status:401} )
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
                const account = await prisma.account.create({
                    data: {
                      userId: newUser.id,
                      type: "credentials",
                      provider: "credentials",
                      providerAccountId: newUser.id,
                    },
                  })
                
                if(newUser && account){
                    return NextResponse.json({ newUser })
                }
                else{
                    return NextResponse.json({message: "Unable to link account to created user profile" }, {status: 401})
                }
            }
            else{
                return NextResponse.json({message: "It seems that something went wrong, please try again" }, {status: 401})
            }
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

export async function DELETE(request: NextRequest) {

    console.log(request.json())
    const  body  =  await request.json()
    console.log(body)
      
    try {
        const user = await prisma.user.delete({
            where : {
                id : id
            }
        })
        if(user) {
            return NextResponse.json({user} , {status:200} )
        }
        else {

            return NextResponse.json({message: "It seems that something went wrong, please try again" }, {status: 401})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error: " + error })
    }
}