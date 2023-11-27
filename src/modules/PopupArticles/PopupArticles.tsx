import { Autocomplete, Flex, Modal, Stack, TextInput, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArticle } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Footer, GroupTest, Header, InputTest, NameTest, QuestionTest, SelectTest, TextTest } from "..";
import { useTestsState } from "./useTestsState";

export function PopupArticles() {
    const router = useRouter()
    const { formArticles, ...query } = router.query

    const form = useForm({
        initialValues: {
            test1: '',
            test2: ''
        },

        validate: {
            test1: (value) => (value.length <= 1 ? 'Укажите название' : null)
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
                                {...form.getInputProps('test1')}
                                placeholder="Настоящее продолженное время для обозначения будущего..."
                            />
                            <Autocomplete
                                w={'100%'}
                                variant='filled'
                                label="Раздел"
                                placeholder="Разговорные темы и лексика"
                                data={['React', 'Angular', 'Vue', 'Svelte']}
                                leftSection={<IconArticle size={16} />}
                            />
                        </Flex>
                        <Textarea
                            label="Текст материала"
                            placeholder="Текст"
                            autosize
                            minRows={2}
                            maxRows={40}
                        />
                        {
                            exercise.length >= 1 && <Stack>
                                <Title size={20} fw={600}>Тест</Title>
                                {exercise.map((test, index) => (
                                    <Stack key={index} gap={20}>
                                        <NameTest />
                                        {
                                            test.list.map((item, index) => {
                                                switch (item.type) {
                                                    case 'select':
                                                        return (
                                                            <SelectTest key={item.id} index={index} remove={() => removeTest(item.id)} />
                                                        )
                                                    case 'input':
                                                        return (
                                                            <InputTest key={item.id} index={index} remove={() => removeTest(item.id)} />
                                                        )
                                                    case 'question':
                                                        return (
                                                            <QuestionTest key={item.id} index={index} remove={() => removeTest(item.id)} />
                                                        )
                                                    case 'text':
                                                        return (
                                                            <TextTest key={item.id} index={index} remove={() => removeTest(item.id)} />
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
                        < Footer appendExercise={appendExercise} appendTest={appendTest} index={exercise.length} />
                    </Stack>
                </Stack>

            </form>
        </Modal >
    );
};