import {useToggle} from "@mantine/hooks";
import {useEffect} from "react";
import {useRouter} from "next/router";

type AllowedEntity = 'card' | 'article'

// TODO: добавить получение id и типа попапа (create | edit)

export function usePopupsControlWithUrl(entity: AllowedEntity) {
    const [isOpen, toggleOpen] = useToggle()
    const router = useRouter()

    useEffect(() => {
        toggleOpen(router.query?.form === entity)
    }, [entity, toggleOpen, router.query]);

    const open = (options: {
        callback?: () => void,
        method?: 'push' | 'replace',
        pathname?: string,
    }) => {
        if (!isOpen) {
            router[options.method ?? 'push']((options.pathname ?? router.pathname) + searchParamsFromObject({
                ...router.query, form: entity
            }))
                .finally(() => {
                    options.callback && options.callback()
                })
        }
    }

    const close = (options: {
        callback?: () => void,
        method?: 'push' | 'replace',
        pathname?: string,
    }) => {
        if (isOpen) {
            const {form: _, ...query} = router.query
            router[options.method ?? 'push']((options.pathname ?? router.pathname) + searchParamsFromObject(query))
                .finally(() => {
                    options.callback && options.callback()
                })
        }
    }

    return {isOpen, open, close}
}

const searchParamsFromObject = (object: Record<string, string | string[] | undefined>) => {
    let string = '?'
    for (const key in object) {
        if (typeof object[key] === 'string') {
            (!string.endsWith("&") && !string.endsWith("?")) && (string += "&")
            string += `${key}=${object[key]}`
        }
        if (typeof object[key] === 'object' && Array.isArray(object[key])) {
            (object[key] as string[]).forEach(i => {
                (!string.endsWith("&") && !string.endsWith("?")) && (string += "&")
                string += `${key}=${i}`
            })
        }
    }
    return string
}