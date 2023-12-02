import {Articles} from "@/types";
import {Button, Container, Flex, Text, Title} from "@mantine/core";
import {useRouter} from "next/router";

export function ArticleItem({ data }: { data: Partial<Articles> }) {
    const router = useRouter()

    const test = 'Одним из самых эффективных способов расширить словарный запас является чтение на английском языке. Выбирайте книги, статьи, блоги или другие материалы по своим интересам'

    const spliceWord = (words: string) => words.split(' ').splice(0, 22).join(' ')

    return (
        <Container w={'100%'} p={15} bg={'gray.1'} style={{ borderRadius: '8px' }}>
            <Flex justify={'space-between'} columnGap={15} align={'center'}>
                <Flex direction='column'>
                    <Title c={'blue.6'} order={6} fw={500} mb={10}>{data.name}</Title>
                    <Text fw={500}>{data.text}</Text>
                    <Text lineClamp={2} c={'gray.6'} size={'14px'}>{data.description}</Text>
                </Flex>
                <Button onClick={() => router.push({ query: { formArticle: 'opened', id: data.id } })}>Изменить</Button>
            </Flex>
        </Container>
    );
}