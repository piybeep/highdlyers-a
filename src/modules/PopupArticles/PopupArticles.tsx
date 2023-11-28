import { Autocomplete, Flex, Modal, Stack, TextInput, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArticle } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Footer, Header, InputTest, NameTest, QuestionTest, SelectTest, TextTest } from "..";
import { useTestsState } from "./useTestsState";

export type testType = {
    id: number,
    question: string,
    answers: {
        name: string,
        isRight: boolean
    }[]
}

export type questionType = {
    id: number,
    texts: {
        id: number,
        value: string
    }[]
}

export type formValues = {
    name: string,
    chapter: string,
    text: string,
} & Record<string, testType[] | questionType | any>

export function PopupArticles() {
    const router = useRouter()
    const { formArticles, ...query } = router.query

    const form = useForm<formValues>({
        initialValues: {
            name: '',
            chapter: '',
            text: '',
        },

        validate: {
            name: (value) => (value.length <= 1 ? 'Укажите название' : null),
            chapter: (value) => (value.length <= 1 ? 'Укажите название' : null),
            text: (value) => (value.length <= 1 ? 'Укажите название' : null),
        }
    })

    const submit = (values: typeof form.values) => {
        console.log(values)
    }

    const { exercise, appendExercise, appendTest, removeTest } = useTestsState()

    return (
        <Modal
            opened={router.query.formArticles === 'opened' ? true : false}
            onClose={() => router.push({ query: query })}
            fullScreen
            withCloseButton={false}
        >
            <form
                onSubmit={form.onSubmit((values) => submit(values))}
            >
                <Stack align='center'>
                    <Stack maw={900} gap={30} w={'100%'}>
                        <Header loading={false} onClose={() => { router.push({ query: query }), form.reset() }} onRemove={() => console.log('remove')} />
                        <Title size={20} fw={600} w={'100%'}>{router.query.id ? 'Изменение материала' : 'Добавление материала'}</Title>
                        <Flex gap={20}>
                            <TextInput
                                label='Название'
                                variant='filled'
                                w={'100%'}
                                {...form.getInputProps('name')}
                                placeholder="Настоящее продолженное время для обозначения будущего..."
                            />
                            <Autocomplete
                                w={'100%'}
                                variant='filled'
                                label="Раздел"
                                placeholder="Разговорные темы и лексика"
                                data={['React', 'Angular', 'Vue', 'Svelte']}
                                {...form.getInputProps('chapter')}
                                leftSection={<IconArticle size={16} />}
                            />
                        </Flex>
                        <Textarea
                            label="Текст материала"
                            placeholder="Текст"
                            autosize
                            {...form.getInputProps('text')}
                            minRows={2}
                            maxRows={40}
                        />
                        {
                            exercise.length >= 1 && <Stack>
                                <Title size={20} fw={600}>Тест</Title>
                                {exercise.map((test, exerciseIndex) => (
                                    <Stack key={exerciseIndex} gap={20}>
                                        <NameTest form={form} name={`exercise - ${exerciseIndex}`} />
                                        {
                                            test.list.map((item, itemIndex) => {
                                                switch (item.type) {
                                                    case 'select':
                                                        return (
                                                            // Сделано
                                                            <SelectTest id={itemIndex} form={form} name={`exercise - ${exerciseIndex}`} key={item.id} index={itemIndex} remove={() => removeTest(item.id)} />
                                                        )
                                                    case 'input':
                                                        return (
                                                            // Сделано
                                                            <InputTest id={itemIndex} form={form} name={`exercise - ${exerciseIndex}`} key={item.id} index={itemIndex} remove={() => removeTest(item.id)} />
                                                        )
                                                    case 'question':
                                                        return (
                                                            // Не сделано
                                                            <QuestionTest id={itemIndex} form={form} name={`exercise - ${exerciseIndex}`} key={item.id} index={itemIndex} remove={() => removeTest(item.id)} />
                                                        )
                                                    case 'text':
                                                        return (
                                                            // Не сделано
                                                            <TextTest key={item.id} index={itemIndex} remove={() => removeTest(item.id)} />
                                                        )
                                                    default:
                                                        break;
                                                }
                                            })
                                        }
                                    </Stack>
                                ))}
                            </Stack>
                        }
                        <Footer appendExercise={appendExercise} appendTest={appendTest} index={exercise.length} />
                    </Stack>
                </Stack>

            </form>
        </Modal >
    );
};