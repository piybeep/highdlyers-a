import logo from '@/public/imgs/logo.svg'

import {Anchor, Image, Stack, Text} from "@mantine/core";
import Link from 'next/link';

export function Logo() {
    return (
        <Stack gap={40} align='center' w={'100%'}>
            <Image src={logo.src} w={278} h={151} alt={''} />
            <Text>Система управления сайтом <Anchor component={Link} underline='always' href={"https://highflyers.ru"} target='_blank'>highflyers.ru</Anchor></Text>
        </Stack>
    );
}