import instance from '@/lib/axios'
import type { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from "next-auth/providers/credentials"

export const authConfig: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const res = await instance.put('auth', { email: credentials?.email, password: credentials?.password })

                const user = res.data

                return user ?? null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                token.accessToken = session.accessToken
                token.refreshToken = session.refreshToken
            }
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token as any

            return session
        }
    },
    pages: {
        signIn: '/login'
    },
}

export default NextAuth(authConfig)
function GoogleProvider(arg0: { clientId: string | undefined; clientSecret: string | undefined }): import("next-auth/providers/index").Provider {
    throw new Error('Function not implemented.')
}

