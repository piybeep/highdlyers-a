import { ArticleItem } from "@/components";
import { MainLayout } from "@/layouts";
import { PopupArticles } from "@/modules";
import { Box, Checkbox, Flex, SimpleGrid, Stack, Title } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getServerSideProps = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}levels`)
    return { props: { levels: res.data } }
}

export default function ArticlesPage() {
    const router = useRouter()
    const { ...query } = router.query

    const checkBoxDataTest = ['Разговорные темы и лексика', 'Части речи', 'Времена']

    const initialValues = checkBoxDataTest.map((theme: any) => ({ ...theme, label: theme, checked: router.query.levels?.includes(theme.name), key: theme }))

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

    useEffect(() => {
        router.push({ query: { ...query, 'themes': values.filter(i => i.checked).map(i => i.label).join(',') } })
    }, [values])
    const itemArticles = checkBoxDataTest.map(current => (
        <ArticleItem key={current} data={'123'} />
    ))


    return (
        <Stack gap={40}>
            <PopupArticles />
            <Flex direction={'column'} maw={350}>
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
                    <SimpleGrid cols={2} mt={15} spacing={'sm'} verticalSpacing={'sm'}>
                        {items}
                    </SimpleGrid>
                </Box>
            </Flex>
            <SimpleGrid h={'100%'} cols={{ base: 1, lg: 2 }} spacing="lg" verticalSpacing="lg">
                {itemArticles}
            </SimpleGrid>
        </Stack>
    );
};

ArticlesPage.getLayout = function getLayout(page: any) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}