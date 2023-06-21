import { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt"

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID as string;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

  if (!clientId || !clientSecret || clientId.length === 0 || clientSecret.length === 0) {
    throw new Error("Missing Google credentials");
  }
  console.log("Good Credentials")
  return { clientId, clientSecret };
}

function getFacebookCredentials() {
  const clientId = process.env.FACEBOOK_CLIENT_ID as string;
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET as string;

  if (!clientId || !clientSecret || clientId.length === 0 || clientSecret.length === 0) {
    throw new Error("Missing Facebook credentials");
  }
  console.log("Good Credentials")
  return { clientId, clientSecret };
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}
const prisma = new PrismaClient()
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    FacebookProvider({
      clientId: getFacebookCredentials().clientId,
      clientSecret: getFacebookCredentials().clientSecret
    }),
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password"
        }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!user || !user.hashedPassword) {
          throw new Error("Email doesn't exist")
        }

        const isCorrectPassword = await compare(credentials.password, user.hashedPassword)
        if (!isCorrectPassword) {
          throw new Error("Password is incorrect")
        }
        return user
      }
    })
  ],
  callbacks: {
    session({ session, token }) {
      // console.log('tokenUsername', token.username);
      console.log("Session", session);
      console.log(session.user.id);
      //chech if the user is authenticated and if the token is not null
      if (token) {
        session.user.id = token.id as string;
      }

      return session;
    },
    jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.id = user.id;
      }
      console.log("JWT", token);
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string
}