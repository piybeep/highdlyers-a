import useAxiosAuth from "@/lib/hook/useAxiosAuth"
import { rem } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"

export function useUploadFile() {
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />
    const axiosAuth = useAxiosAuth()

    const handleUploadFile = async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)

        return await axiosAuth.post('files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                notifications.show({
                    title: `Файл успешно загружен`,
                    message: `${res.data.filename}`,
                    icon: checkIcon,
                    color: 'green',
                })
                console.log(res)
                return res.data.filename
            })
            .catch(error => {
                console.error(error)
                notifications.show({
                    title: `Произошла ошибка, ${error.response.data.error}`,
                    message: `${error.response.data.message}`,
                    icon: xIcon,
                    color: 'red'
                })
            })
    }

    return handleUploadFile
}