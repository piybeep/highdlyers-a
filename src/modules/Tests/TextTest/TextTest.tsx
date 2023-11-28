import { Button, Flex, Stack, Text, Textarea, Title } from "@mantine/core";
import { useListState, useTextSelection } from "@mantine/hooks";
import { useRef, useState } from "react";

export function TextTest({ remove, index }: { remove: () => void, index: number }) {
    // Пока тестовый вариант
    const [words, setWords] = useListState<string>()
    const selection = useTextSelection()
    const textRef = useRef<any>(null)

    console.log(words)

    const handleAddWord = () => {
        let text = textRef.current.value!
        let selectionText = selection?.toString()
        if (selectionText && text.includes(selectionText)) {
            if (words.includes(selectionText)) {
                console.log('Такое слово есть')
                setWords.setState(words.filter((i: string) => i != selectionText))
            } else {
                console.log('Такого слова нет')
                setWords.setState([...words, selectionText]);
            }
        }
    }

    return (
        <Stack gap={5}>
            <Flex justify={'space-between'} align={'flex-end'}>
                <Flex direction='column'>
                    <Flex align='center' columnGap={10}>
                        <Title size={15} fw={600}>Элемент {index + 1}</Title>
                        <Button onClick={() => remove()} c='gray.6' p={0} style={{ textDecoration: 'underline' }} variant='transparent'>Удалить</Button>
                    </Flex>
                    <Text fz={14} c='gray.6'>текст с вводом слов</Text>
                </Flex>
                <Button
                    onClick={() => handleAddWord()}
                    size='compact-sm'
                >Сделать ответом</Button>
            </Flex>
            <Textarea
                ref={textRef}
                autosize
                minRows={3}
                maxRows={15} />
        </Stack>
    );
};