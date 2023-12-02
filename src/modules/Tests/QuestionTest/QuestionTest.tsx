import {Button, Flex, Input, Stack, Text, Title} from "@mantine/core";

import s from './QuestionTest.module.scss'
import {UseFormReturnType} from "@mantine/form";
import {formValues, questionType} from "@/modules/PopupArticles/PopupArticles";
import {useEffect, useState} from "react";

export function QuestionTest({ remove, index, form, id, name }:
    {
        remove: () => void,
        index: number
        form: UseFormReturnType<formValues>
        id: number,
        name: string
    }) {

    const [values, setValues] = useState<questionType>({
        id: id,
        texts: []
    })

    useEffect(() => {
        const copyList: questionType[] = form.values[name].list
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
            <Text fz={14} c='gray.6'>диалог</Text>
            <Flex gap={0} direction={'column'}>
                {
                    values.texts.map((item, index) => (
                        <Flex key={index}>
                            <Input
                                value={item.value}
                                onChange={value => setValues(state => {
                                    // state.texts.value[index] = value.target.value
                                    state.texts[index].value = value.target.value
                                    return { ...state }
                                })}
                                required
                                key={index}
                                variant='filled'
                                classNames={{ input: s.input }}
                                placeholder={`Напишите что-то... ${index + 1}`}
                                w='100%' />
                            <Button onClick={() => setValues(state => {
                                const removeElement = state.texts.filter(i => i.id != item.id)
                                // return { ...removeElement }
                                state = { id: id, texts: removeElement }
                                return { ...state }
                            })}
                            >Удалить</Button>
                        </Flex>
                    ))
                }
                <Button
                    onClick={() => setValues(state => {
                        state.texts.push({ id: Date.now(), value: '' })
                        return { ...state }
                    })}
                    c={'blue.6'}
                    size="md"
                    justify='flex-start'
                    className={s.button}>Добавить</Button>
            </Flex>
        </Stack >
    );
}