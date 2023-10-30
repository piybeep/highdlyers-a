import { Button, Flex, Modal, Title, rgba } from "@mantine/core";
import { PopupRemoveProps } from "./PopupRemove.types";
import { useRouter } from "next/router";

export function PopupRemove({ id, entity, message }: PopupRemoveProps) {
    const router = useRouter()
    const { formRemove, ...query } = router.query
    return (
        <Modal
            padding={30}
            opened={router.query.formRemove === 'opened' ? true : false}
            withCloseButton={false}
            centered
            onClose={() => router.push({ query: query })}
            bg={rgba('0, 0, 0', 0.2)}
        >
            <Title order={4} fw={600}>Удалить {message}?</Title>
            <Flex mt={20} gap={10}>
                <Button w={'100%'} variant='light' onClick={() => router.push({ query: query })}>Отменить</Button>
                {/* <Button w={'100%'} onClick={}>Удалить</Button> */}
            </Flex>
        </Modal>
    );
};