import useAxiosAuth from "@/lib/hook/useAxiosAuth"
import { Card } from "@/types"
import { useRouter } from "next/router"

export const useGetCurrentCard = () => {
    const axiosAuth = useAxiosAuth()
    const router = useRouter()
    const getCurrentCard = (form: any) => {
        axiosAuth.get<Card>(`cards/${router.query.id}`)
            .then(res => {
                form.setValues({
                    name: res.data.name,
                    read_time: res.data.read_time,
                    level: {
                        id: res.data.level.id,
                        name: res.data.level.name
                    },
                    link: res.data.link,
                    preview: res.data.preview,
                    isFree: res.data.isFree,
                })
            })
    }

    return getCurrentCard
}
