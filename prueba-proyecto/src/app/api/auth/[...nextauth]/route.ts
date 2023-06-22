import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '../../../../lib/db'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: {  label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user.hashedPassword) {
                    throw new Error('Invalid credentials');
                }
            }
        })
    ]
}