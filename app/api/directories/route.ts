import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const email = searchParams.get('email')     
        try {
            let directories
            if (id && id !=='all') {

                directories = await prisma.directories.findMany({
                    where : {
                        userId : id,
                        user : {
                            email : email
                        }
                    },
                    select: {
                        id: true,
                        title : true,
                        type : true,
                        content : true,
                        updateDate: true,
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
            else if(id === 'all'){                
                directories = await prisma.directories.findMany({                    
                    select: {
                        id: true,
                        title : true,
                        type : true,
                        content : true,
                        updateDate: true,
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
                return NextResponse.json({ message: "no enough data to get the info : userId" }, {status:401})
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
