import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { Button, FileInput, Flex, List, Modal, SimpleGrid, Stack, Text, TextInput, Title, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useRouter } from "next/router";

export function PopupCards() {
    const router = useRouter()
    const axiosAuth = useAxiosAuth()

    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

    const form = useForm({
        initialValues: {
            name: '',
            time: 0,
            chapter: '',
            file: ''
        },

        validate: {
            name: (value) => (value.length < 1 ? 'Укажите название' : null),
            time: (value) => (value < 1 ? 'Укажите время' : null),
            chapter: (value) => (value.length < 1 ? 'Укажите раздел' : null),
            file: (value) => (!value ? 'Загрузите файл' : null),
        },
    });

    const submit = (values: typeof form.values) => {
        console.log(values)
        axiosAuth.post('cards', {
            name: values.name,
            read_time: values.time,
            // Пока заглушка
            isFree: true,
            // Пока заглушка
            link: values.file,
            level_id: values.chapter,
        })
            .then(res => {
                console.log(res)
                // notifications.show({
                //     title: 'Карточка сохранена',
                //     message: session?.data?.user?.user?.first_name ? `Вы успешно зашли, ${session.data.user.user.first_name}` : 'Вы успешно зашли',
                //     icon: checkIcon,
                //     color: 'green'
                // })
            })
            .catch(error => {
                console.log(error)
                notifications.show({
                    title: `Произошла ошибка, ${error.response.data.error}`,
                    message: `${error.response.data.message.join().replaceAll(',', ', ')} `,
                    icon: xIcon,
                    color: 'red'
                })
            })
    }

    return (
        <Modal
            opened={router.query.formCards === 'opened' ? true : false}
            onClose={() => router.push({ pathname: router.pathname, query: { formCards: 'closed' } })}
            fullScreen
            withCloseButton={false}
        >
            <form onSubmit={form.onSubmit(submit)}>
                <Stack align='center'>
                    <Stack gap={'xl'} maw={960} w={'100%'}>
                        <Flex gap={'lg'} maw={960} w={'100%'}>
                            <Button type='submit' fw={400} bg={'blue.6'} size='md' w={'100%'}>Сохранить</Button>
                            <Button fw={400} c={'blue.6'} bg={'blue.0'} size='md' w={'100%'} onClick={() => router.push({ pathname: router.pathname })}>Отмена</Button>
                        </Flex>
                        <Title order={3} fw={'600'}>Изменение материала</Title>
                        <SimpleGrid w={'100%'}>
                            <TextInput
                                variant='filled'
                                label="Название" placeholder="Название" {...form.getInputProps('name')} />
                            <Flex justify='space-between' gap={'lg'}>
                                <TextInput
                                    variant='filled'
                                    type='number'
                                    leftSection={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M8 4.66667V8L10 10M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    } w={'100%'} label="Время чтения (минут)" placeholder="50" {...form.getInputProps('time')} />
                                <TextInput
                                    variant='filled'
                                    leftSection={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M4.66667 5.33329H11.3333M4.66667 7.99996H11.3333M4.66667 10.6666H11.3333M3.33333 2.66663H12.6667C13.403 2.66663 14 3.26358 14 3.99996V12C14 12.7363 13.403 13.3333 12.6667 13.3333H3.33333C2.59695 13.3333 2 12.7363 2 12V3.99996C2 3.26358 2.59695 2.66663 3.33333 2.66663Z" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    } w={'100%'} label="Раздел" placeholder="A1" {...form.getInputProps('chapter')} />
                            </Flex>
                            <FileInput variant='filled' placeholder="Загрузить"
                                {...form.getInputProps('file')}
                                label='Файл' />
                        </SimpleGrid>
                    </Stack>
                </Stack>
            </form>
        </Modal >
    );
};