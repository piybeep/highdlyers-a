import { Button, SimpleGrid, Stack, Title } from "@mantine/core";

export function Footer({ appendExercise, appendTest }: any) {
    return (
        <Stack gap={10} w={'100%'}>
            <Title size={14} fw={600}>Добавить элемент</Title>
            <SimpleGrid cols={2}>
                <Button
                    onClick={() => appendTest('select')}
                    variant='outline'
                    style={{ borderStyle: 'dashed', backgroundColor: '#228BE608' }}
                >
                    Вопрос с вариантами ответа
                </Button>
                <Button
                    onClick={() => appendTest('input')}
                    variant='outline'
                    style={{ borderStyle: 'dashed', backgroundColor: '#228BE608' }}
                >
                    Вопрос с вводом ответа
                </Button>
                <Button
                    onClick={() => appendTest('question')}
                    variant='outline'
                    style={{ borderStyle: 'dashed', backgroundColor: '#228BE608' }}
                >
                    Текст с вводом слов
                </Button>
                <Button
                    onClick={() => appendTest('text')}
                    variant='outline'
                    style={{ borderStyle: 'dashed', backgroundColor: '#228BE608' }}
                >
                    Диалог
                </Button>
            </SimpleGrid>
            <Button
                onClick={() => appendExercise('testName')}
                variant='light'
                size="md">Создать новое упражнение</Button>
        </Stack>
    );
};