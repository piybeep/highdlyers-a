import {Button, Flex, Input, Stack, TextInput, Title} from "@mantine/core";
import {IconQuestionMark} from "@tabler/icons-react";

import s from './InputTest.module.scss'
import {UseFormReturnType} from "@mantine/form";
import {formValues} from "@/modules/PopupArticles/PopupArticles";
import {useEffect, useState} from "react";

export function InputTest({ remove, index, id, form, name }:
    {
        remove: () => void,
        index: number
        id: number
        name: string
        form: UseFormReturnType<formValues>
    }) {

    interface testType {
        id: Number,
        question: string,
        answer: string
    }

    const [values, setValues] = useState<testType>({
        id: id,
        question: '',
        answer: ''
    })

    useEffect(() => {
        const copyList: testType[] = form.values[name].list
        if (copyList) {
            const existingTest = copyList.some(i => i.id === id)
            if (!existingTest) {
                copyList.push(values)
                form.setFieldValue(name, { ...form.values[name], list: copyList })
            } else {
                const existingQuestion = copyList.map(i => i.id === id ? values : i)
                form.setFieldValue(name, { ...form.values[name], list: existingQuestion })
            }
        }
    }, [values])

    return (
        <Stack gap={0}>
            <Flex align='center' columnGap={10}>
                <Title size={15} fw={600}>Элемент {index + 1}</Title>
                <Button onClick={() => remove()} c='gray.6' p={0} style={{ textDecoration: 'underline' }} variant='transparent'>Удалить</Button>
            </Flex>
            <TextInput
                value={values.question}
                onChange={value => setValues(state => ({ ...state, question: value.target.value }))}
                mb={10}
                variant='filled'
                placeholder="Вопрос"
                leftSection={<IconQuestionMark size={16} />}
                description='с вводом ответа'
            />
            <Flex gap={10}>
                <Input
                    value={values.answer}
                    onChange={value => setValues(state => ({ ...state, answer: value.target.value }))}
                    classNames={{ input: s.input }}
                    placeholder="Ответ"
                    w='100%' />
            </Flex>
        </Stack>
    );
}