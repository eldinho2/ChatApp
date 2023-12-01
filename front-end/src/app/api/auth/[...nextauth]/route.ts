import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password", type: "password" }
      },

      async authorize(credentials) {
        const user = await fetch("http://localhost:3001/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        })

        const token = await user.json()

        if (token && user.ok) {
          return token
        }
        
        return null
      }
    })
  ],
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }