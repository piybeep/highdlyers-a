import { ActionIcon, Button, Flex } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { HeaderProps } from "./Header.types";

export function Header({ loading, onClose, onRemove }: HeaderProps) {
    const router = useRouter()
    return (
        <Flex gap={'lg'} maw={960} w={'100%'}>
            <Button loading={loading} type='submit' fw={400} bg={'blue.6'} size='md' w={'100%'}>Сохранить</Button>
            <Button loading={loading} fw={400} c={'blue.6'} bg={'blue.0'} size='md' w={'100%'} onClick={() => onClose()}>Отмена</Button>
            {
                router.query.id &&
                <ActionIcon
                    variant="light"
                    size={42}
                    onClick={() => onRemove()}
                >
                    <IconTrash />
                </ActionIcon>
            }
        </Flex>
    );
};