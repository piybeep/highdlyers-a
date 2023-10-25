import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { Levels } from "@/types";
import { Button, Checkbox, Flex, Text, Modal, NumberInput, Select, SimpleGrid, Stack, TextInput, Title, rem, Center } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useRef } from "react";

import s from './PopupCards.module.scss'

export function PopupCards({ levels }: { levels: Levels[] }) {
    const router = useRouter()
    const axiosAuth = useAxiosAuth()
    const openRef = useRef<() => void>(null);

    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

    const form = useForm({
        initialValues: {
            name: '',
            time: 0,
            chapter: '',
            file: null as File | null,
            isFree: false,
        },

        validate: {
            name: (value) => (value.length < 1 ? 'Укажите название' : null),
            time: (value) => (value < -1 ? 'Укажите время' : null),
            chapter: (value) => (value.length < 1 ? 'Укажите раздел' : null),
            file: (value) => (!value ? 'Загрузите файл' : null),
        },
    });

    const formatTime = (value: number, arrayString: string[]) => {
        const cases = [2, 0, 1, 1, 1, 2];
        return `${value} ${arrayString[value % 100 > 4 && value % 100 < 20 ? 2 : cases[value % 10 < 5 ? value % 10 : 5]]}`
    }

    const preparedTime = (value: number) => {
        const hoursEnd = ['час', 'часа', 'часов']
        const minutesEnd = ['минута', 'минуты', 'минут']
        let timeConvertWatch = new Date(value * 60 * 1000).toISOString().substr(11, 8)
        return timeConvertWatch.split(':').slice(0, 2)
            .toReversed()
            .map((time, index) => {
                return Number(time) === 0 ? undefined : index === 0 ? formatTime(Number(time), minutesEnd) : formatTime(Number(time), hoursEnd)
            })
            .toReversed()
            .filter(time => !!time)
            .join(' ')
    }

    const handleUploadFile = (file: File) => {
        // Пока костыль
        let fileLink = 'https://elar.urfu.ru/bitstream/10995/28697/1/978-5-7996-1340-2_2014.pdf'
        return fileLink
    }

    const submit = async (values: typeof form.values) => {
        console.log(values)
        axiosAuth.post('cards', {
            name: values.name,
            read_time: preparedTime(values.time),
            isFree: values.isFree,
            link: await handleUploadFile(values.file!),
            level_id: levels.find((lvl: any) => lvl.name === values.chapter)!.id,
        })
            .then(res => {
                console.log(res)
                // notifications.show({
                //     title: 'Карточка сохранена',
                //     message: session?.data?.user?.user?.first_name ? `Вы успешно зашли, ${session.data.user.user.first_name}` : 'Вы успешно зашли',
                //     icon: checkIcon,
                //     color: 'green'
                // })
                form.reset()
            })
            .catch(error => {
                console.log(error)
                notifications.show({
                    title: `Произошла ошибка, ${error.response.data.error}`,
                    message: `${error.response.data.message}`,
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
                                <NumberInput
                                    variant='filled'
                                    min={0}
                                    leftSection={
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M8 4.66667V8L10 10M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    } w={'100%'} label="Время чтения (в минутах)" placeholder="50" {...form.getInputProps('time')} />
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
                                <Dropzone maxFiles={1} multiple={false} w={'100%'} className={s.dropzone} openRef={openRef} onDrop={(e: any) => { form.setFieldValue('file', e[0]) }} activateOnClick={true}>
                                    <Center>
                                        <Text c={'blue.6'}>
                                            {form.values.file?.name ?? 'Загрузить'}
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