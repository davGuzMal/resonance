import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../../lib/prisma";


export async function POST(request: Request) {
    const id = await request.json()     
    
    try {
        if (id) {  
                const directories = await prisma.directories.deleteMany({
                    where : {
                        userId : id
                    }
                })
                const user = await prisma.user.delete({
                    where : {
                        id : id
                    }
                })     
                // if(user) 
                return NextResponse.json({success: true}, {status : 200})
                // else return NextResponse.json({message: "User not found"}, {status : 401})
            }
            else{                
                return NextResponse.json({ message: "Something went wrong, please try again" }, {status : 402})
            }
        } catch (error) {
            
            return NextResponse.json({ message: "Error: " + error })
        }     
}