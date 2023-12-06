import type { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { NextRequest, NextResponse } from "next/server";
// const bcrypt = require('bcrypt')

export const authOptions : NextAuthOptions ={
  adapter : PrismaAdapter(prisma),
  providers : [
      EmailProvider({
        server: //process.env.EMAIL_SERVER,
        {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,          
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
          }
        },
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
  // debug : process.env.NODE_ENV === "development",
  
  
  callbacks: {   
  
    async session({ session, user }) {
      session.user = user      
    //   session.role = user.role;
    
      return Promise.resolve(session);
    },
      
  },   
}