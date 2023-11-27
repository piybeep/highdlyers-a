import { Stack, Flex, Title, Button, Input, Text } from "@mantine/core";

import s from './QuestionTest.module.scss'

export function QuestionTest({ remove, index }: { remove: () => void, index: number }) {
    return (
        <Stack gap={0}>
            <Flex align='center' columnGap={10}>
                <Title size={15} fw={600}>Элемент {index + 1}</Title>
                <Button onClick={() => remove()} c='gray.6' p={0} style={{ textDecoration: 'underline' }} variant='transparent'>Удалить</Button>
            </Flex>
            <Text fz={14} c='gray.6'>диалог</Text>
            <Flex gap={0} direction={'column'}>
                <Input
                    variant='filled'
                    classNames={{ input: s.input }}
                    placeholder="Напишите что-то..."
                    w='100%' />
                <Button
                    c={'blue.6'}
                    size="md"
                    justify='flex-start'
                    className={s.button}>Добавить</Button>
            </Flex>
        </Stack>
    );
};