import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MainLayout } from "@/layouts";
import { Box, Button, Checkbox, Flex, Modal, Pagination, SimpleGrid, Stack, Title } from "@mantine/core";
import { randomId, useListState } from "@mantine/hooks";
import { useRouter } from "next/router";

export default function CardsPage() {
    const router = useRouter()

    const axiosAuth = useAxiosAuth()
    const { data: session } = useSession()
    const [cards, setcards] = useState([])
    useEffect(() => {
        getUsers()
    }, [session])
    console.log(cards)

    const getUsers = async () => {
        await axiosAuth.get('cards')
            .then(res => { setcards(res.data.users) })
            .catch(error => { console.log(error), setcards([]) })
    }

    // Для чекбокса
    const initialValues = [
        { label: 'A1', checked: false, key: randomId() },
        { label: 'A2', checked: false, key: randomId() },
        { label: 'B1', checked: false, key: randomId() },
        { label: 'B2', checked: false, key: randomId() },
        { label: 'C1', checked: false, key: randomId() },
        { label: 'C2', checked: false, key: randomId() },
    ];

    const [values, handlers] = useListState(initialValues);

    const allChecked = values.every((value) => value.checked);
    const items = values.map((value, index) => (
        <Checkbox
            label={value.label}
            key={value.key}
            checked={value.checked}
            onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
        />
    ));
    // Для чекбокса

    return (
        <Stack gap={40}>
            <Flex direction={'column'} maw={172}>
                <Title order={4}>Карточки</Title>
                <Box mt={20}>
                    <Checkbox
                        radius={'lg'}
                        checked={allChecked}
                        label="Показать все"
                        onChange={() =>
                            handlers.setState((current) =>
                                current.map((value) => ({ ...value, checked: !allChecked }))
                            )
                        }
                    />
                    <SimpleGrid cols={3} mt={15} spacing={'sm'} verticalSpacing={'sm'}>
                        {items}
                    </SimpleGrid>
                </Box>
            </Flex>
            <SimpleGrid h={'100%'} cols={2} spacing="lg" verticalSpacing="lg">
                {items}
            </SimpleGrid>
            <Pagination total={10} />
        </Stack >
    );
};

CardsPage.getLayout = function getLayout(page: any) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}