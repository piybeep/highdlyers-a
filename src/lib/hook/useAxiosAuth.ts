import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import instance from "../axios";

const useAxiosAuth = () => {
    const { data: session } = useSession();
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestIntercept = instance.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent && session?.user.refreshToken) {
                    prevRequest.sent = true;
                    await refreshToken()
                    prevRequest.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
                    return instance(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            instance.interceptors.request.eject(requestIntercept);
            instance.interceptors.response.eject(responseIntercept);
        };
    }, [session, refreshToken]);

    return instance;
};

export default useAxiosAuth;