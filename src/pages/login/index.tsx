import { useRouter } from "next/router";
import Link from "next/link";

// Form
import { useForm } from "@mantine/form";
// mantine
import { Anchor, Button, Paper, PasswordInput, Stack, TextInput, rem } from "@mantine/core";
// notification
import { notifications } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons-react';
// api
import { signIn, useSession } from "next-auth/react";
import { Logo } from "@/components";

export default function LoginPage() {
    const session = useSession()
    const router = useRouter()
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

    const form = useForm({
        initialValues: { email: '', password: '' },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неправильная почта'),
            password: (value) => (value.length < 1 ? 'Заполните поле' : null),
        }
    })

    const onSubmit = (values: typeof form.values) => {
        signIn('credentials', { email: values.email, password: values.password, redirect: false })
            .then(res => {
                if (res?.ok && !res.error) {
                    router.push(router.query.callbackUrl as string ?? '/')
                    notifications.show({
                        title: 'Вы авторизованы',
                        message: session?.data?.user?.user?.first_name ? `Вы успешно зашли, ${session.data.user.user.first_name}` : 'Вы успешно зашли',
                        icon: checkIcon,
                        color: 'green'
                    })
                } else {
                    notifications.show({
                        title: 'Произошла ошибка',
                        message: `${res?.error}`,
                        icon: xIcon,
                        color: 'red'
                    })
                }
            })
    }

    return (
        <Stack align='center' w={'100%'} gap={40}>
            <Paper withBorder p="xl">
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack gap={16}>
                        <TextInput w={300} label="Почта" {...form.getInputProps('email')} />
                        <PasswordInput w={300} label="Пароль" type='password' {...form.getInputProps('password')} />
                        <Anchor c={'gray.9'} component={Link} underline='always' href={"/link"}>Войти по ссылке через почту</Anchor>
                        <Button type="submit" size="md" fullWidth>Войти</Button>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    );
};

LoginPage.getLayout = function getLayout(page: any) {
    return (
        <>
            <Stack align="center" gap={40} mt={60}>
                <Logo />
                {page}
            </Stack>
        </>
    )
}