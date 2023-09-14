import type { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const bcrypt = require('bcrypt')
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
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied
              const user = await prisma.user.findUnique({
                where : {
                    email : credentials?.email,                    
                },                
              })
        
              if (user) {
                const checkPassw = await bcrypt.compare(credentials?.password, user.password)
                
                if(checkPassw){
                   
                    return user
                } else{
                    return Promise.reject(this.authorize)
                }
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return Promise.reject(this.authorize)
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }
          }),
        EmailProvider({
          server: {
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
    
    callbacks: {      

     
        async session({ session, user, token }) {
          session.user = user       
        //   session.role = user.role;
        
          return Promise.resolve(session);
        },
          
      },   
}