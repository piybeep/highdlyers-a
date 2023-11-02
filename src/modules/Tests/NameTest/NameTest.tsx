import { Autocomplete } from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";

export function NameTest() {
    return (
        <Autocomplete
            placeholder="Название"
            variant='filled'
            rightSection={<IconSelector size={14} />}
            data={['React', 'Angular', 'Vue', 'Svelte']}
        />
    );
};