import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})

instance.interceptors.response.use((config) => {
    return config
},
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API}auth/refresh`, { headers: { Authorization: `Bearer ${localStorage.getItem('refreshToken')}` } })
                localStorage.setItem('refreshToken', response.data.refreshToken)
                localStorage.setItem('accessToken', response.data.accessToken)
                return instance.request(originalRequest)
            } catch (error) {
                throw error
            }
        }
        throw error
    }
)

export default instance