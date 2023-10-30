import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MainLayout } from "@/layouts";
import { Box, Button, Checkbox, Flex, Modal, Pagination, SimpleGrid, Stack, Title } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { useRouter } from "next/router";
import { PopupCards } from "@/modules";
import axios from "axios";
import { Card, Levels } from "@/types";
import { CardItem } from "@/components";

export const getServerSideProps = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}levels`)
    return { props: { levels: res.data } }
}
export default function CardsPage({ levels }: { levels: Levels[] }) {
    const router = useRouter()
    const axiosAuth = useAxiosAuth()
    const { data: session } = useSession()
    const [cards, setCards] = useState<Card[]>([])

    const getCards = async () => {
        await axiosAuth.get('cards')
            .then(res => { setCards(res.data) })
            .catch(error => { console.log(error), setCards([]) })
    }

    useEffect(() => {
        getCards()
    }, [session, router.query])

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

    // Для карточек
    const itemCards = cards?.map(card => (
        <CardItem key={card.id} data={card} />
    ))
    // Для карточек

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
            <SimpleGrid h={'100%'} cols={{ base: 1, lg: 2 }} spacing="lg" verticalSpacing="lg">
                {itemCards}
            </SimpleGrid>
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