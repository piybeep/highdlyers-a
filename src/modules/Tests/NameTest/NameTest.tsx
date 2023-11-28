import { formValues } from "@/modules/PopupArticles/PopupArticles";
import { Autocomplete } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconSelector } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function NameTest({ form, name }: { form: UseFormReturnType<formValues>, name: string }) {
    const [value, setValue] = useState<string>('')

    useEffect(() => {
        if (!form.values[name]) {
            form.setFieldValue(name, { name: value, list: [] })
        } else {
            form.setFieldValue(name, { name: value, list: form.values[name].list })
        }
    }, [value])

    return (
        <Autocomplete
            required
            value={value}
            onChange={(value: string) => setValue(value)}
            placeholder="Название"
            variant='filled'
            rightSection={<IconSelector size={14} />}
            data={['React', 'Angular', 'Vue', 'Svelte']}
        />
    );
};