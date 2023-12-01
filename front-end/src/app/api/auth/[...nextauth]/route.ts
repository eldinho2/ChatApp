import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios';
import { JWT } from "next-auth/jwt";

interface AxiosError extends Error {
  response?: {
    data?: {
      message: string;
    };
  };
}


export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id:'login',
      name: "Login",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password" }
      },      
      async authorize(credentials) {
        try {
          const response = await axios.post("http://localhost:3001/auth/signin", {
            email: credentials?.email,
            password: credentials?.password
          })
      
          const data = response.data;
          if (response.status !== 200) {
            throw new Error(data.message);
          }
      
          return data
        } catch (error) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.data?.message) {
            throw new Error(axiosError.response.data.message);
          }
          throw error;
        }
      }
    }),
    CredentialsProvider({
      id:'register',
      name: "Register",
      credentials: {
        userName: { label: "userName", type: "text", placeholder: "userName" },
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password" }
      },

      async authorize(credentials) {
        try {
          const response = await axios.post("http://localhost:3001/auth/signup", {
            userName: credentials?.userName,
            email: credentials?.email,
            password: credentials?.password
          })
      
          const data = response.data;
          
      
          if (response.status !== 200) {
            throw new Error(data.message);
          }
      
          return data
        } catch (error) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.data?.message) {
            throw new Error(axiosError.response.data.message);
          }
          throw error;
        }
      }
    }),
  ],
  callbacks: {
  async jwt({ token, user, account, profile, isNewUser }) {
    if (user) {
      token = user as any;
    }
    return token;
  },

  async session({ session, token, user }) {
    session.user = token;
    return session;
  },
},
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }