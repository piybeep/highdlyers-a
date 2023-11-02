import { Card, Levels } from "@/types";
import { ActionIcon, Button, Checkbox, Flex, Modal, Select, SimpleGrid, Stack, TextInput, Title, rem } from "@mantine/core";
import { TimeInput } from '@mantine/dates';
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { DropzoneFile } from "./DropzoneFile";
import { PopupRemove } from "@/components";
import { notifications } from "@mantine/notifications";
import { IconArticle, IconCheck, IconClockHour4, IconTrash, IconX } from "@tabler/icons-react";
import { useManagementAxios } from "@/hooks/useManagementAxios";

export function PopupCards({ levels }: { levels: Partial<Levels[]> }) {
    const router = useRouter()
    const { formCards, id, ...query } = router.query

    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />

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
    useEffect(() => {
        form.reset()
        router.query.id && fetch()
            .then(res => {
                form.setValues({
                    name: res.data.name,
                    read_time: res.data.read_time,
                    level: {
                        id: res.data.level.id,
                        name: res.data.level.name
                    },
                    link: res.data.link,
                    preview: res.data.preview,
                    isFree: res.data.isFree,
                })
            })
    }, [router.query.id])
    // Для запроса на выбор конкретной карточки

    // Для отправки формы
    const { save, fetch, loading } = useManagementAxios<Card & { level_id: string }>('cards', router.query.id as string)
    // Для отправки формы

    return (
        <Modal
            opened={router.query.formCards === 'opened' ? true : false}
            onClose={() => router.push({ pathname: router.pathname, query: { formCards: 'closed' } })}
            fullScreen
            withCloseButton={false}
        >
            <PopupRemove id={router.query.id as string} name={form.values.name} entity={'cards'} />
            <form onSubmit={form.onSubmit(
                () => {
                    save(
                        { ...form.values, level_id: levels.find((lvl: any) => lvl.name === form.values.level.name)!.id },
                        {
                            callback: res => {
                                notifications.show({
                                    title: 'Карточка сохранена',
                                    message: router.query.id ? 'Вы успешно изменили карточку' : 'Карточка добавлена',
                                    icon: checkIcon,
                                    color: 'green'
                                })
                                form.reset()
                                router.push({ query: query })
                            },
                            handleError: error => {
                                notifications.show({
                                    title: `Произошла ошибка, ${error.response.data.error}`,
                                    message: `${error.response.data.message}`,
                                    icon: xIcon,
                                    color: 'red'
                                })
                            },
                            method: router.query.id ? 'patch' : 'post'
                        }
                    )
                }
            )}>
                <Stack align='center'>
                    <Stack gap={'xl'} maw={960} w={'100%'}>
                        <Flex gap={'lg'} maw={960} w={'100%'}>
                            <Button loading={loading} type='submit' fw={400} bg={'blue.6'} size='md' w={'100%'}>Сохранить</Button>
                            <Button loading={loading} fw={400} c={'blue.6'} bg={'blue.0'} size='md' w={'100%'} onClick={() => { router.push({ pathname: router.pathname }); form.reset() }}>Отмена</Button>
                            {
                                router.query.id &&
                                <ActionIcon
                                    variant="light"
                                    size={42}
                                    onClick={() => router.push({ query: { ...router.query, 'formRemove': 'opened' } })}
                                >
                                    <IconTrash />
                                </ActionIcon>
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
                                    leftSection={<IconClockHour4 size={16} />}
                                    w={'100%'}
                                    {...form.getInputProps('read_time')}
                                    label="Время чтения"
                                />
                                <Select
                                    leftSection={<IconArticle size={16} />}
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