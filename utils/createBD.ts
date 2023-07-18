import { now } from "next-auth/client/_utils";
import { prisma } from "../lib/prisma";

// npx prisma db push --force-reset
// npx prisma db push
// npx prisma generate
// npx prisma studio

export default async function createDB() {
    try {    
        await prisma.user.createMany({
            data: [
                {
                    id : "1",
                    name : "David",                    
                    email : "dgm051195@gmail.com",                    
                },
                {
                    id : "2",
                    name : "Valeria",                    
                    email : "valecama@gmail.com",                   
                    
                },

            ]
        })
    }catch (error) {
        console.log(error)
    }
}