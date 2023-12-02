import {Button, Flex, Modal, rem, rgba, Title} from "@mantine/core";
import {PopupRemoveProps} from "./PopupRemove.types";
import {useRouter} from "next/router";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";
import {useManagementAxios} from "@/hooks/useManagementAxios";

export function PopupRemove({ id, entity, name }: PopupRemoveProps) {
    const router = useRouter()
    const { formRemove, ...query } = router.query

    const { remove, loading } = useManagementAxios(entity, id)

    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />

    return (
        <Modal
            padding={30}
            opened={router.query.formRemove === 'opened'}
            withCloseButton={false}
            centered
            onClose={() => router.push({ query: query })}
            bg={rgba('0, 0, 0', 0.2)}
        >
            <Title order={4} fw={600}>Удалить {name}?</Title>
            <Flex mt={20} gap={10}>
                <Button loading={loading} w={'100%'} variant='light' onClick={() => router.push({ query: query })}>Отменить</Button>
                <Button loading={loading} w={'100%'} onClick={() =>
                    remove({
                        callback: res => {
                            notifications.show({
                                title: 'Удалено',
                                message: `Вы удалили ${name}`,
                                icon: checkIcon,
                                color: 'green'
                            })

                            router.push({ query: {} })
                        },
                        handleError: error => {
                            notifications.show({
                                title: `Произошла ошибка, ${error.response.data.error}`,
                                message: `${error.response.data.message}`,
                                icon: xIcon,
                                color: 'red'
                            })
                        }
                    })
                }>Удалить</Button>
            </Flex>
        </Modal>
    );
}