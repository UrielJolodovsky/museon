import bcrypt from 'bcrypt';
import { compare } from 'bcrypt';
import NextAuth, { Session, AuthOptions, NextAuthOptions, DefaultSession, DefaultUser, User } from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '../../../../lib/db'


declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            tipo_usuario: string;
            // ...other properties
        // role: UserRole;
        } & DefaultSession["user"];
    }
  }

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    pages: {
        signIn: '/login',
    },
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
                console.log("Entramoos")
                console.log(credentials?.email, credentials?.password)
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing fields');
                }

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email,  
                    }
                });

                if (!user || !user.hashedPassword) {
                    throw new Error('This email is not registered');
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

                if (!isCorrectPassword) {
                    throw new Error('Wrong password');
                }

                if (user.emailVerified === null) {
                    throw new Error("You have not verified this email")
                }

                return user;
   }
        })
    ],
    // debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
        maxAge: Date.now() * 30 * 60
    },
    callbacks: {
        session({ session, token }) {
          // console.log('tokenUsername', token.username);
          console.log("Session", session);
          console.log(session.user?.id);
          //chech if the user is authenticated and if the token is not null
          if (token) {
            session.user.id = token.id as string;
            // session.user.tipo_usuario = token.tipo_usuario as string; 
          }
          return session;
        },
    jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            //token.tipo_usuario = user.tipo_usuario;
        }
        console.log('token', token);
        return token;
    },
},
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }