import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../../lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    const id = params.userId
        try {
            if (id) {
                
                const user = await prisma.user.findFirst({
                    where : {
                        id : id
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
                return NextResponse.json({ message: "no enough data to get the info : userId" })
            }
        } catch (error) {
            console.log(error)
            return NextResponse.json({ message: "Error: " + error })
        }        


}