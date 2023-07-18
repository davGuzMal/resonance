import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma";

export async function GET(request: Request) {
    console.log(request.body)
    
    const {
        userId                 
    } = await request.json()  
    console.log(userId)
        try {
            if (userId) {

                const directories = await prisma.directories.findMany({
                    where : {
                        userId : userId
                    },
                    select: {
                        id: true,
                        title : true,
                        type : true,
                        content : true,
                        user: {
                            select: {
                                id : true,
                                name : true,                                
                            }
                        }
                    }
                })
                return NextResponse.json({directories}, { status : 200})
            }
            else{
                return NextResponse.json({ message: "no enough data to get the info : userId" })
            }
        } catch (error) {
            console.log(error)
            return NextResponse.json({ message: "Error: " + error })
        }        


}
export async function POST(request: Request) {
            
        const {
            title,
            type,
            content,
            userId                  
        } = await request.json()        
        
        try {            
            if (userId) {
                const newDirectory = await prisma.directories.create({
                    data: {
                        title,
                        type,
                        content,
                        userId
                    }
                }) 
                return NextResponse.json({ newDirectory })
            } else {        
                     
                return NextResponse.json({ message: "no enough data to create directory : userId" })
            }
        } catch (error) {
            console.log(error)
            return NextResponse.json({ message: "Error: " + error })
        }
}
