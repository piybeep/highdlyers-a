import { signIn, signOut, useSession } from "next-auth/react";
// import instance from "../axios";
import axios from "axios";

export const useRefreshToken = () => {
    const { data: session, update } = useSession();

    const refreshToken = async () => {

        await axios.get(`${process.env.NEXT_PUBLIC_API}auth/refresh`, { headers: { Authorization: `Bearer ${session?.user.refreshToken}` } })
            .then(res => {
                if (session) {
                    session.user.accessToken = res.data.accessToken
                    session.user.refreshToken = res.data.refreshToken

                    update({ accessToken: res.data.accessToken, refreshToken: res.data.refreshToken })
                }
                else {
                    signIn('credentials')
                };
            })
            .catch(error => {
                console.error(error)
                signOut()
            })
    };
    return refreshToken;
};