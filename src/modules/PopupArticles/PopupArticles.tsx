import { Autocomplete, Flex, Modal, Stack, TextInput, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArticle } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Footer, GroupTest, Header } from "..";

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
                        <GroupTest />
                        <Footer />
                    </Stack>
                </Stack>

            </form>
        </Modal>
    );
};