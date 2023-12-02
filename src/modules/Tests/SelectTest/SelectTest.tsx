import {Button, Flex, Input, Stack, TextInput, Title} from "@mantine/core";
import {IconQuestionMark} from "@tabler/icons-react";

import s from './Select.module.scss'
import {UseFormReturnType} from "@mantine/form";
import {formValues, testType} from "@/modules/PopupArticles/PopupArticles";
import {useEffect, useState} from "react";

export function SelectTest({ remove, index, form, name, id }:
    {
        remove: () => void,
        index: number,
        name: string,
        form: UseFormReturnType<formValues>,
        id: number
    }) {

    const [values, setValues] = useState<testType>({
        id: id,
        question: '',
        answers: [
            {
                name: '',
                isRight: false
            },
            {
                name: '',
                isRight: false
            },
            {
                name: '',
                isRight: false
            },
            {
                name: '',
                isRight: false
            }
        ]
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
                <Button
                    onClick={() => remove()}
                    c='gray.6'
                    p={0}
                    style={{ textDecoration: 'underline' }}
                    variant='transparent'>Удалить</Button>
            </Flex>
            <TextInput
                required
                value={values.question}
                onChange={value => setValues(state => ({ ...state, question: value.target.value }))}
                mb={10}
                variant='filled'
                placeholder="Вопрос"
                leftSection={<IconQuestionMark size={16} />}
                description='с вариантами ответа'
            />
            <Flex gap={10}>
                {
                    values.answers.map((item, index) => (
                        <Input
                            key={index}
                            value={values.answers[index].name}
                            onChange={value => setValues(state => {
                                state.answers[index].name = value.target.value
                                return { ...state }
                            })}
                            onFocus={() => setValues(state => {
                                state.answers.forEach(i => { i.isRight = false })
                                state.answers[index].isRight = !state.answers[index].isRight
                                return { ...state }
                            })}
                            required
                            classNames={{ input: s.input }}
                            data-right={values.answers[index].isRight}
                            placeholder={`Ответ (${index + 1})`}
                            w='100%' />
                    ))
                }
            </Flex>
        </Stack>
    );
}