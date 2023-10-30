import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { allowEntities } from "@/types";
import { useToggle } from "@mantine/hooks";
import { AxiosError, AxiosResponse } from "axios";

export function useManagementAxios<T = Record<string, any>>(entity: allowEntities, entity_id?: string) {
    const axiosAuth = useAxiosAuth()
    const [loading, toggleLoading] = useToggle()

    const save = (payload: Partial<T>, options?: {
        method?: "post" | "patch",
        callback?: (response: AxiosResponse<T>) => any,
        handleError?: (error: AxiosError<T> | any) => any,
    }) => {
        toggleLoading()
        return axiosAuth[options?.method ?? 'post']<T>(`${entity}/${options?.method != 'post' && entity_id || ''}`, payload)
            .then(options?.callback)
            .catch(options?.handleError)
            .finally(() => {
                toggleLoading()
            })
    }

    const remove = (options?: {
        callback?: (response: AxiosResponse<T>) => any,
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

    const fetch = () => {
        return axiosAuth.get<T>(`${entity}/${entity_id}`)
    }

    return { save, remove, loading, entity, entity_id, fetch }
}
