import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import {useToggle} from "@mantine/hooks";
import {AxiosResponse} from "axios";

type allowEntities = 'cards' | 'levels' | 'lesson-plans' | 'check-lists'

export function useMegaHook<T = Record<string, any>>(entity: allowEntities, entity_id?: string) {
    const axiosAuth = useAxiosAuth()
    const [loading, toggleLoading] = useToggle()

    const save = (payload: Partial<T>, options?: {
        method?: "push" | "patch",
        callback?: (response: AxiosResponse<T>) => any
    }) => {
        toggleLoading()
        return axiosAuth[options.method ?? 'push']<T>(`${entity}/${entity_id ?? ''}`, payload)
            .then(options?.callback)
            .catch(err => {
                console.error(err)
                return err
            })
            .finally(() => {
                toggleLoading()
            })
    }

    const remove = (callback?: (response: AxiosResponse<T>) => any) => {
        toggleLoading()
        return axiosAuth.delete(`${entity}/${entity_id}`)
            .then(callback)
            .catch(err => {
                console.error(err)
                return err
            })
            .finally(() => {
                toggleLoading()
            })
    }

    return {save, remove, loading, entity, entity_id}
}
