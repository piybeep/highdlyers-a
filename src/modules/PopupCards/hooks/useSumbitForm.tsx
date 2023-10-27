import useAxiosAuth from "@/lib/hook/useAxiosAuth"
import { Card, Levels } from "@/types"
import { rem } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"
import { useRouter } from "next/router"

const useSubmitForm = ({ levels, form }: { levels: Partial<Levels[]>, form: any }) => {
    const router = useRouter()
    const axiosAuth = useAxiosAuth()

    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />

    const onSubmit = async ({ values }: { values: Card }) => {
        axiosAuth[router.query.id ? 'patch' : 'post'](`cards/${router.query.id ?? ''}`, {
            name: values.name,
            read_time: values.read_time,
            isFree: values.isFree,
            link: values.link,
            preview: values.preview,
            level_id: levels.find((lvl: any) => lvl.name === values.level.name)!.id,
        })
            .then(res => {
                console.log(res)
                notifications.show({
                    title: 'Карточка сохранена',
                    message: router.query.id ? 'Вы успешно изменили карточку' : 'Карточка добавлена',
                    icon: checkIcon,
                    color: 'green'
                })

                router.push({ pathname: router.pathname, query: { 'formCards': 'close' } })
                form.reset()
            })
            .catch(error => {
                console.log(error)
                notifications.show({
                    title: `Произошла ошибка, ${error.response.data.error}`,
                    message: `${error.response.data.message}`,
                    icon: xIcon,
                    color: 'red'
                })
            })
    }

    return onSubmit
}

export default useSubmitForm