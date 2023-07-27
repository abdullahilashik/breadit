import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { CredentialsProvider } from "next-auth/providers";
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {db} from './db';
import {nanoid} from 'nanoid';
import "server-only";

const options : NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session:{
        strategy: 'jwt'
    },
    pages:{
        signIn: '/sign-in'
    },
    providers:[
        GoogleProvider(
            {
                clientId: process.env.GOOGLE_CLIENT_ID  as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
            }
        )
    ],
    callbacks:{
        async session({token, session}){
            if(token){
                // token is available; assign values to session
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.username = token.username;
            }

            return session;
        },
        async jwt({token, user}){
            const dbUser = await db.user.findFirst({
                where:{
                    email: token.email
                }
            });
            if(!dbUser){
                token.id = user!.id;
                return token;
            }
            if(!dbUser.username){
                await db.user.update({
                    where:{id: dbUser.id},
                    data:{
                        username: nanoid(10)
                    }
                });
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                username: dbUser.username
            }
        },
        redirect(){
            return '/'
        }
    }
};

export default options;