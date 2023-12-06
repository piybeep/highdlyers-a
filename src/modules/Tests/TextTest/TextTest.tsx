import { Button, Flex, Stack, Text, Title } from "@mantine/core";

import { Color } from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import TextTipTap from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'

import s from './TestTest.module.scss'

export function TextTest({ remove, index }: { remove: () => void, index: number }) {
    const editor = useEditor({
        extensions: [Document, Paragraph, TextTipTap, TextStyle, Color],
        content: ``,
    })

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
                <Flex direction='column' rowGap={5}>
                    <Button
                        onClick={() => editor?.chain().focus().setColor('#228BE6').run()}
                        size='compact-sm'
                    >Сделать ответом</Button>
                    <Button
                        onClick={() => editor?.chain().focus().unsetColor().run()}
                        size='compact-sm'
                    >Убрать ответ</Button>
                </Flex>
            </Flex>
            <EditorContent className={s.editor} editor={editor} />
        </Stack>
    );
}