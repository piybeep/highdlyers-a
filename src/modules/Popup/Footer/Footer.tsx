import { Button, SimpleGrid, Stack, Title, rgba } from "@mantine/core";

export function Footer() {
    return (
        <Stack gap={10} w={'100%'}>
            <Title size={14} fw={600}>Добавить элемент</Title>
            <SimpleGrid cols={2}>
                <Button
                    variant='outline'
                    style={{ borderStyle: 'dashed', backgroundColor: '#228BE608' }}
                >
                    Вопрос с вариантами ответа
                </Button>
                <Button
                    variant='outline'
                    style={{ borderStyle: 'dashed', backgroundColor: '#228BE608' }}
                >
                    Вопрос с вводом ответа
                </Button>
                <Button
                    variant='outline'
                    style={{ borderStyle: 'dashed', backgroundColor: '#228BE608' }}
                >
                    Текст с вводом слов
                </Button>
                <Button
                    variant='outline'
                    style={{ borderStyle: 'dashed', backgroundColor: '#228BE608' }}
                >
                    Диалог
                </Button>
            </SimpleGrid>
            <Button variant='light' size="md">Создать новое упражнение</Button>
        </Stack>
    );
};