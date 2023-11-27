import { Stack, Flex, Title, Button, TextInput, Input } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

import s from './InputTest.module.scss'

export function InputTest({ remove, index }: { remove: () => void, index: number }) {
    return (
        <Stack gap={0}>
            <Flex align='center' columnGap={10}>
                <Title size={15} fw={600}>Элемент {index + 1}</Title>
                <Button onClick={() => remove()} c='gray.6' p={0} style={{ textDecoration: 'underline' }} variant='transparent'>Удалить</Button>
            </Flex>
            <TextInput
                mb={10}
                variant='filled'
                placeholder="Вопрос"
                leftSection={<IconQuestionMark size={16} />}
                description='с вводом ответа'
            />
            <Flex gap={10}>
                <Input
                    classNames={{ input: s.input }}
                    placeholder="Ответ"
                    w='100%' />
            </Flex>
        </Stack>
    );
};