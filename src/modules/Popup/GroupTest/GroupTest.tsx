import { InputTest, NameTest, QuestionTest, SelectTest, TextTest } from "@/modules";
import { Stack, Title } from "@mantine/core";

export function GroupTest() {
    return (
        <Stack gap={20}>
            <Title size={20} fw={600}>Тест</Title>
            <NameTest />
            <SelectTest />
            <InputTest />
            <QuestionTest />
            <TextTest />
        </Stack>
    );
};