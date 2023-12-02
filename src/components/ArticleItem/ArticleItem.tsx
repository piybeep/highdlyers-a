import {Articles} from "@/types";
import {Button, Container, Flex, Text, Title} from "@mantine/core";
import Link from "next/link";

export function ArticleItem({ data }: { data: Partial<Articles> }) {

    return (
        <Container w={'100%'} p={15} bg={'gray.1'} style={{ borderRadius: '8px' }}>
            <Flex justify={'space-between'} columnGap={15} align={'center'}>
                <Flex direction='column'>
                    <Title c={'blue.6'} order={6} fw={500} mb={10}>{data.name}</Title>
                    <Text fw={500}>{data.text}</Text>
                    <Text lineClamp={2} c={'gray.6'} size={'14px'}>{data.description}</Text>
                </Flex>
                <Button component={Link} href={{ query: { form: 'article', id: data.id } }}>Изменить</Button>
            </Flex>
        </Container>
    );
}