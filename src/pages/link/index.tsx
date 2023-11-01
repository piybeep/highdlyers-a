import { Logo } from "@/components";
import { Anchor, Button, Paper, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";

export default function LinkPage() {
    const form = useForm({
        initialValues: { email: '', },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неправильная почта'),
        }
    })

    const onSubmit = (values: typeof form.values) => {
        console.log(values)
    }

    return (
        <Stack align='center' w={'100%'} gap={40}>
            <Paper withBorder p="xl">
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack gap={16}>
                        <TextInput w={300} label="Почта" {...form.getInputProps('email')} />
                        <Anchor c={'gray.9'} component={Link} underline='always' href={"/login"}>Войти по паролю</Anchor>
                        <Button type="submit" size="md" fullWidth>Отправить ссылку на вход</Button>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    );
};

LinkPage.getLayout = function getLayout(page: any) {
    return (
        <Stack align="center" gap={40} mt={60}>
            <Logo />
            {page}
        </Stack>
    )
}