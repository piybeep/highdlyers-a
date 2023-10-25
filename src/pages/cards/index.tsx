import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MainLayout } from "@/layouts";
import { Box, Button, Checkbox, Flex, Modal, Pagination, SimpleGrid, Stack, Title } from "@mantine/core";
import { randomId, useListState } from "@mantine/hooks";
import { useRouter } from "next/router";
import { PopupCards } from "@/modules";
import axios from "axios";
import { Levels } from "@/types";

export const getServerSideProps = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}levels`)
    return { props: { levels: res.data } }
}

export default function CardsPage({ levels }: { levels: Levels[] }) {
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
    const initialValues = levels.map((lvl: Levels) => ({ ...lvl, label: lvl.name, checked: false, key: lvl.id }))

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
            <PopupCards levels={levels} />
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