import { Levels } from "@/types";
import { Button, Checkbox, Flex, Modal, Select, SimpleGrid, Stack, TextInput, Title } from "@mantine/core";
import { TimeInput } from '@mantine/dates';
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { DropzoneFile } from "./DropzoneFile";
import { useGetCurrentCard } from "./hooks/useGetCurrentCard";
import { useFormControl } from "./hooks/useFormControl";
import { PopupRemove } from "@/components";

export function PopupCards({ levels }: { levels: Partial<Levels[]> }) {
    const router = useRouter()

    const form = useForm({
        initialValues: {
            name: '',
            read_time: '',
            level: {
                id: '',
                name: ''
            },
            link: '',
            preview: '',
            isFree: false,
        },

        validate: {
            name: (value) => (value.length < 1 ? 'Укажите название' : null),
            read_time: (value) => (value.length < 1 ? 'Укажите время' : null),
            level: {
                name: (value) => (!value ? 'Укажите раздел' : null)
            },
            link: (value) => (!value ? 'Загрузите файл' : null),
            preview: (value) => (!value ? 'Загрузите файл' : null),
        },
    });

    // Для запроса на выбор конкретной карточки
    const getCurrentCard = useGetCurrentCard()
    useEffect(() => {
        router.query.id && getCurrentCard(form)
    }, [router.query.id])
    // Для запроса на выбор конкретной карточки

    // Для отправки формы
    // const onSubmit = useSubmitForm({ levels, form })
    const { onSubmit } = useFormControl({ levels, form })
    // Для отправки формы

    return (
        <Modal
            opened={router.query.formCards === 'opened' ? true : false}
            onClose={() => router.push({ pathname: router.pathname, query: { formCards: 'closed' } })}
            fullScreen
            withCloseButton={false}
        >
            <PopupRemove id={router.query.id as string} message={form.values.name} entity={'cards'} />
            <form onSubmit={form.onSubmit(() => onSubmit({ values: form.values }))}>
                <Stack align='center'>
                    <Stack gap={'xl'} maw={960} w={'100%'}>
                        <Flex gap={'lg'} maw={960} w={'100%'}>
                            <Button type='submit' fw={400} bg={'blue.6'} size='md' w={'100%'}>Сохранить</Button>
                            <Button fw={400} c={'blue.6'} bg={'blue.0'} size='md' w={'100%'} onClick={() => { router.push({ pathname: router.pathname }); form.reset() }}>Отмена</Button>
                            {
                                router.query.id &&
                                <Button fw={400} c={'blue.6'} bg={'blue.0'} size='md' w={'100%'} onClick={() => router.push({ pathname: router.pathname, query: { formCards: 'opened', formRemove: 'opened', id: router.query.id } })}>Удалить</Button>
                            }
                        </Flex>
                        <Title order={3} fw={'600'}>Изменение материала</Title>
                        <SimpleGrid w={'100%'}>
                            <TextInput
                                variant='filled'
                                label="Название" placeholder="Название" {...form.getInputProps('name')} />
                            <Flex justify='space-between' direction={{ xs: 'row', base: 'column' }} gap={'lg'}>
                                <TimeInput
                                    variant='filled'
                                    leftSection={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M8 4.66667V8L10 10M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    }
                                    w={'100%'}
                                    {...form.getInputProps('read_time')}
                                    label="Время чтения"
                                />
                                <Select
                                    label="Раздел"
                                    variant='filled'
                                    {...form.getInputProps('level.name')}
                                    placeholder="A1"
                                    w={'100%'}
                                    data={levels.map((current) => current?.name!)}
                                />
                            </Flex>
                            <DropzoneFile
                                form={form}
                                title={"Файл"}
                                value={"link"} />
                            <DropzoneFile
                                form={form}
                                title={"Обложка"}
                                value={"preview"} />

                            <Checkbox
                                {...form.getInputProps('isFree')}
                                label="Является бесплатным"
                                color="green"
                                size="md"
                                radius="md"
                            />
                        </SimpleGrid>
                    </Stack>
                </Stack>
            </form>
        </Modal >
    );
};