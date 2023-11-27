import { Button, Flex, Stack, Title, Input, TextInput } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

import s from './Select.module.scss'

export function SelectTest({ remove, index }: { remove: () => void, index: number }) {
    return (
        <Stack gap={0}>
            <Flex align='center' columnGap={10}>
                <Title size={15} fw={600}>Элемент {index + 1}</Title>
                <Button
                    onClick={() => remove()}
                    c='gray.6'
                    p={0}
                    style={{ textDecoration: 'underline' }}
                    variant='transparent'>Удалить</Button>
            </Flex>
            <TextInput
                mb={10}
                variant='filled'
                placeholder="Вопрос"
                leftSection={<IconQuestionMark size={16} />}
                description='с вариантами ответа'
            />
            <Flex gap={10}>
                <Input
                    classNames={{ input: s.input }}
                    placeholder="Ответ (1)"
                    w='100%' />
                <Input
                    classNames={{ input: s.input }}
                    placeholder="Ответ (2)"
                    w='100%' />
                <Input
                    classNames={{ input: s.input }}
                    placeholder="Ответ (3)"
                    w='100%' />
                <Input
                    classNames={{ input: s.input }}
                    placeholder="Ответ (4)"
                    w='100%' />
            </Flex>
        </Stack>
    );
};