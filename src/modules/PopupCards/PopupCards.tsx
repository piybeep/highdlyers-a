import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { Card, Levels } from "@/types";
import { Button, Checkbox, Flex, Text, Modal, Select, SimpleGrid, Stack, TextInput, Title, rem, Center } from "@mantine/core";
import { TimeInput } from '@mantine/dates';
import { Dropzone } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import s from './PopupCards.module.scss'
import classNames from "classnames";

export function PopupCards({ levels }: { levels: Partial<Levels[]> }) {
    const router = useRouter()
    const axiosAuth = useAxiosAuth()

    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

    const [isLoad, setIsLoad] = useState({ file: false, preview: false })

    const form = useForm({
        initialValues: {
            name: '',
            time: '',
            chapter: '',
            file: '',
            preview: '',
            isFree: false,
        },

        validate: {
            name: (value) => (value.length < 1 ? 'Укажите название' : null),
            time: (value) => (value.length < 1 ? 'Укажите время' : null),
            chapter: (value) => (value.length < 1 ? 'Укажите раздел' : null),
            file: (value) => (!value ? 'Загрузите файл' : null),
            preview: (value) => (!value ? 'Загрузите файл' : null),
        },
    });

    useEffect(() => {
        console.log(router.query.id)
        router.query.id &&
            axiosAuth.get<Card>(`cards/${router.query.id}`)
                .then(res => {
                    console.log(res)
                    form.setValues({
                        name: res.data.name,
                        time: res.data.read_time,
                        chapter: res.data.level.name,
                        file: res.data.link,
                        preview: res.data.preview,
                        isFree: res.data.isFree,
                    })
                })

    }, [router.query.id])

    const handleUploadFile = async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)

        return await axiosAuth.post('files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                return res.data.filename
            })
            .catch(error => {
                console.error(error)
                notifications.show({
                    title: `Произошла ошибка, ${error.response.data.error}`,
                    message: `${error.response.data.message}`,
                    icon: xIcon,
                    color: 'red'
                })
            })
    }

    const submit = async (values: typeof form.values) => {
        console.log(values)
        // axiosAuth[router.query.id ? 'patch' : 'post'](`cards/${router.query.id ?? ''}`, {
        //     name: values.name,
        //     read_time: values.time,
        //     isFree: values.isFree,
        //     link: values.file,
        //     preview: values.preview,
        //     level_id: levels.find((lvl: any) => lvl.name === values.chapter)!.id,
        // })
        //     .then(res => {
        //         console.log(res)
        //         notifications.show({
        //             title: 'Карточка сохранена',
        //             message: router.query.id ? 'Вы успешно изменили карточку' : 'Карточка добавлена',
        //             icon: checkIcon,
        //             color: 'green'
        //         })

        //         router.push({ pathname: router.pathname, query: { 'formCards': 'close' } })
        //         form.reset()
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         notifications.show({
        //             title: `Произошла ошибка, ${error.response.data.error}`,
        //             message: `${error.response.data.message}`,
        //             icon: xIcon,
        //             color: 'red'
        //         })
        //     })
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
                            <Button fw={400} c={'blue.6'} bg={'blue.0'} size='md' w={'100%'} onClick={() => { router.push({ pathname: router.pathname }); form.reset() }}>Отмена</Button>
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
                                    {...form.getInputProps('time')}
                                    label="Время чтения"
                                />
                                <Select
                                    label="Раздел"
                                    variant='filled'
                                    {...form.getInputProps('chapter')}
                                    placeholder="A1"
                                    w={'100%'}
                                    data={levels.map((current: any) => current.name)}
                                />
                            </Flex>
                            <Flex w={'100%'} direction={'column'} rowGap={5}>
                                <Text size='sm' fw={500}>Файл</Text>
                                <Dropzone loading={isLoad.file} maxFiles={1} multiple={false} w={'100%'} className={classNames(s.dropzone, {
                                    [s.dropzone__error]: form.getInputProps('file').error
                                })} onDrop={(e: any) => {
                                    setIsLoad(state => ({ ...state, file: true }))
                                    handleUploadFile(e[0])
                                        .then(res => form.setFieldValue('file', res))
                                        .finally(() => {
                                            setIsLoad(state => ({ ...state, file: false }))
                                        })
                                }} activateOnClick={true}>
                                    <Center>
                                        <Text c={form.getInputProps('file').error ? 'red.6' : 'blue.6'}>
                                            {form.values.file || 'Загрузить'}
                                        </Text>
                                    </Center>
                                </Dropzone>
                            </Flex>
                            <Flex w={'100%'} direction={'column'} rowGap={5}>
                                <Text size='sm' fw={500}>Обложка карточки</Text>
                                <Dropzone loading={isLoad.preview} maxFiles={1} multiple={false} w={'100%'} className={classNames(s.dropzone, {
                                    [s.dropzone__error]: form.getInputProps('preview').error
                                })} onDrop={(e: any) => {
                                    setIsLoad(state => ({ ...state, preview: true }))
                                    handleUploadFile(e[0])
                                        .then(res => {
                                            form.setFieldValue('preview', res)
                                        })
                                        .finally(() => {
                                            setIsLoad(state => ({ ...state, preview: false }))
                                        })
                                }} activateOnClick={true}>
                                    <Center>
                                        <Text c={form.getInputProps('file').error ? 'red.6' : 'blue.6'}>
                                            {form.values.preview || 'Загрузить'}
                                        </Text>
                                    </Center>
                                </Dropzone>
                            </Flex>
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