import { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "./connect";
import { compare } from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean
    }
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean
  }
}

//вход зарегистрированного, через email и пароль, пользователя
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: "/sign-in"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      //проверяем существуюет пользователь
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials?.email }
        })
        if (!existingUser) {
          return null
        }
        if (existingUser.password) {
          const passwordMatch = await compare(credentials.password, existingUser.password)
          if (!passwordMatch) {
            return null
          }
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    
  ],



  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.isAdmin = token.isAdmin
      }
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username
        }
      }

    },
    async jwt({ token, user }) {
const userInDb = await prisma.user.findUnique({
  where:{
    email:token.email!
  }
})
token.isAdmin = userInDb?.isAdmin!
return token
    },
  }
}

// с помощью этой функции можем получить инфу о пользователях в северных компонентах и API
export const getAuthSession = () => getServerSession(authOptions)