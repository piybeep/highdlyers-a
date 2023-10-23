import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            accessToken: string,
            refreshToken: string,
            user: {
                id: string,
                first_name: string,
                second_name: string,
                email: string,
                isAdmin: boolean,
            }
        }
    }
}