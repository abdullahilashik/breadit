import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { CredentialsProvider } from "next-auth/providers";
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {db} from './db';
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
    ]
};