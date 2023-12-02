import {Center, Flex, Text} from "@mantine/core";
import {Dropzone} from "@mantine/dropzone";
import classNames from "classnames";
import {useState} from "react";

import s from './DropzoneFile.module.scss'
import {useUploadFile} from "@/hooks";

export function DropzoneFile({ form, title, value }: {
    form: any
    title: string
    value: string
},) {
    const [isLoad, setIsLoad] = useState(false)

    // Для загрузи файла
    const handleUploadFile = useUploadFile()
    // Для загрузи файла

    return (
        <Flex w={'100%'} direction={'column'} rowGap={5}>
            <Text onClick={() => console.log(form.values[value], value)} size='sm' fw={500}>{title}</Text>
            <Dropzone loading={isLoad} maxFiles={1} multiple={false} w={'100%'} className={classNames(s.dropzone, {
                [s.dropzone__error]: form.getInputProps(`${value}`).error
            })} onDrop={(e: any) => {
                setIsLoad(true)
                handleUploadFile(e[0])
                    .then(res => form.setFieldValue(`${value}`, res))
                    .finally(() => {
                        setIsLoad(false)
                    })
            }} activateOnClick={true}>
                <Center>
                    <Text c={form.getInputProps(`${value}`).error ? 'red.6' : 'blue.6'}>
                        {form.values[value] || 'Загрузить'}
                    </Text>
                </Center>
            </Dropzone>
        </Flex>
    );
}