import { useRouter } from "next/router";
import Link from "next/link";

import logo from '@/public/imgs/logo.svg'
// Form
import { useForm } from "@mantine/form";
// mantine
import { Anchor, Button, Image, Paper, PasswordInput, Stack, Text, TextInput, rem } from "@mantine/core";
// notification
import { notifications } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';
// api
// import api from "@/lib/api";
import { useUser } from "@/store/user";

export default function index() {
    const router = useRouter()
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

    const { setIsAuth, setUser } = useUser()

    const form = useForm({
        initialValues: { email: '', password: '' },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неправильная почта'),
            password: (value) => (value.length < 1 ? 'Заполните поле' : null),
        }
    })

    const onSubmit = (value: typeof form.values) => {
        // api.put('/auth', { email: value.email, password: value.password })
        //     .then(response => {
        //         localStorage.setItem('refreshToken', response.data.refreshToken)
        //         localStorage.setItem('accessToken', response.data.accessToken)
        //         notifications.show({
        //             title: 'Добро пожаловать',
        //             message: response.data.user.first_name ? `Вы успешно вошли, ${response.data.user.first_name}` : 'Вы успешно вошли',
        //             icon: checkIcon,
        //             color: 'green',
        //         })
        //         setUser(response.data.user)
        //         setIsAuth(true)
        //         router.push('/')
        //     })
        //     .catch(error => {
        //         console.error(error)
        //         notifications.show({
        //             title: 'Произошла ошибка',
        //             message: error.response.data.message ?? error.message,
        //             icon: xIcon,
        //             color: 'red',
        //         })

        //         setIsAuth(false)
        //         setUser(null)
        //     })

        console.log(value)
    }

    return (
        <Stack align='center' mt={60} w={'100%'} h={'100vh'} gap={40}>
            <Image src={logo.src} w={278} h={151} />

            <Text>Система управления сайтом <Anchor component={Link} underline='always' href={"https://highflyers.ru"} target='_blank'>highflyers.ru</Anchor></Text>
            <Paper withBorder p="xl">
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack gap={16}>
                        <TextInput w={300} label="Почта" {...form.getInputProps('email')} />
                        <PasswordInput w={300} label="Пароль" type='password' {...form.getInputProps('password')} />
                        <Anchor c={'gray.9'} component={Link} underline='always' href={"/login-email"}>Войти по ссылке через почту</Anchor>
                        <Button type="submit" size="md" fullWidth>Войти</Button>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    );
};