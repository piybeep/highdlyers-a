import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import {useToggle} from "@mantine/hooks";
import {AxiosError, AxiosResponse} from "axios";

type allowEntities = 'cards' | 'levels' | 'lesson-plans' | 'check-lists'

export function useMegaHook<T = Record<string, any>>(entity: allowEntities, entity_id?: string) {
    const axiosAuth = useAxiosAuth()
    const [loading, toggleLoading] = useToggle()

    const save = (payload: Partial<T>, options?: {
        method?: "post" | "patch",
        callback?: (response: AxiosResponse<T>) => any,
        handleError?: (error: AxiosError<T> | any) => any,
    }) => {
        toggleLoading()
        return axiosAuth[options?.method ?? 'post']<T>(`${entity}/${entity_id ?? ''}`, payload)
            .then(options?.callback)
            .catch(options?.handleError)
            .finally(() => {
                toggleLoading()
            })
    }

    const remove = (options?: {
        callback? : (response: AxiosResponse<T>) => any,
        handleError?: (error: AxiosError<T> | any) => any,
    }) => {
        toggleLoading()
        return axiosAuth.delete(`${entity}/${entity_id}`)
            .then(options?.callback)
            .catch(options?.handleError)
            .finally(() => {
                toggleLoading()
            })
    }

    return {save, remove, loading, entity, entity_id}
}
