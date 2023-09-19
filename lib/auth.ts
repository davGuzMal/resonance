import type { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { randomUUID  } from "crypto";
import Cookies from 'cookies';
import { encode, decode } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";


// let cookies = require("cookies")
const bcrypt = require('bcrypt')
// const getAdapter = (req: NextRequest, res: NextResponse)=> ({
//   ...PrismaAdapter(prisma),
//   async getSessionAndUser(sessionToken: any) {
//     // let db = (await connectDB).db('YOURDBNAME');
//     const userAndSession = await prisma.session.findFirst({
//       select : {
//         sessionToken : sessionToken
//       }
//     })
//     console.log("SESSION USER :", sessionToken, userAndSession)
//     if (!userAndSession) return null
    
//     //insert session data whatever you like 
//     const { user, ...session } = userAndSession
//     console.log("USER", user)
//     return { user: user, session : session }
//   },
// })
// const session = {
//   // strategy: "database",
//   maxAge: 30 * 24 * 60 * 60, // 30 days
//   updateAge: 24 * 60 * 60, // 24 hours
// }

export const authOptions : NextAuthOptions ={
  adapter : PrismaAdapter(prisma),
  providers : [
      CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "Email", type: "text", placeholder: "type your email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            // Add logic here to look up the user from the credentials supplied
            
              
              const user = await prisma.user.findUnique({
                where : {
                    email : credentials?.email,                    
                },                
              })
        
              const checkPassw = await bcrypt.compare(credentials?.password, user?.password)
              if (user && checkPassw) {                
                  return user
              } else{
                  return Promise.reject(this.authorize);
              }
          }
        }),
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        // {
        //   host: process.env.EMAIL_SERVER_HOST,
        //   port: Number(process.env.EMAIL_SERVER_PORT),
        //   auth: {
        //     user: process.env.EMAIL_SERVER_USER,
        //     pass: process.env.EMAIL_SERVER_PASSWORD
        //   }
        // },
        from: process.env.EMAIL_FROM
      }),
      GoogleProvider({
           clientId: process.env.GOOGLE_CLIENT_ID!,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      GitHubProvider({
          clientId: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!
      })
  ],    
  secret : process.env.NEXTAUTH_SECRET,
  debug : process.env.NODE_ENV === "development",
  
  callbacks: {  
    // async jwt({ token, account, profile }) {
    //   // Persist the OAuth access_token and or the user id to the token right after signin
    //   if (account) {
    //     token.accessToken = account.access_token
    //     token.id = profile?.id
    //   }
    //   return token
    // },
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (account?.provider === "Credentials" || account?.provider === "credentials") {
    //     if (user && "id" in user) {
    //       const sessionToken = randomUUID()
    //       const sessionExpiry = new Date(Date.now() + session.maxAge * 1000)
    //       let newSession = await prisma.session.create({
    //         data : {

    //           sessionToken : sessionToken,
    //           userId: user.id,              
    //           expires: sessionExpiry,
              
    //         }
    //         // userAgent: req.headers["user-agent"] ?? null,
    //       })
    //       // newSession = {... newSession, user}
    //       console.log(newSession)
    //       newSession.user = user
    //       console.log(newSession)
    //       // const cookies = new Cookies()
    //       // cookies.set("next-auth.session-token", sessionToken, {
    //       //   expires: sessionExpiry,
    //       // })
    //     }
    //   }
    //   return true
    // },
  
    async session({ session, user, token }) {
      session.user = user       
    //   session.role = user.role;
    
      return Promise.resolve(session);
    },
      
  },   
}