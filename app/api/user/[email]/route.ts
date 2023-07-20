import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../../lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
    
    const email = params.email
    try {
        if (email) {            
            
                const user = await prisma.user.findUnique({
                    where : {
                        email : email
                    },
                    select: {
                        id: true,
                        name : true,
                        email : true,
                        // directories : {
                        //     select : {
                        //         title : true
                        //     }
                        // }                     
                    }
                })                
                return NextResponse.json({user}, {status : 200})
            }
            else{
                
                return NextResponse.json({ message: "no enough data to get the info : email" })
            }
        } catch (error) {
            
            return NextResponse.json({ message: "Error: " + error })
        }        


}