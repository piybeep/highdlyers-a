import {Card} from "@/types";
import {Button, Container, Flex, Text} from "@mantine/core";
import {useRouter} from "next/router";

export function CardItem({ data }: { data: Partial<Card> }) {
    const router = useRouter()
    return (
        <Container w={'100%'} p={15} bg={'gray.1'} style={{ borderRadius: '8px' }}>
            <Flex justify={'space-between'} columnGap={10} align={'center'}>
                <Flex align={'center'} columnGap={10}>
                    <Text c={'blue.6'}>{data.level?.name}</Text>
                    <Text>{data.name}</Text>
                </Flex>
                <Button onClick={() => router.push({ query: { formCards: 'opened', id: data.id } })}>Изменить</Button>
            </Flex>
        </Container>
    );
}