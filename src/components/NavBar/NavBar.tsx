import {Anchor, Box, Flex, Image, NavLink, Stack, Text} from "@mantine/core";

import logo from '@/public/imgs/miniLogo.svg'
import {NAVBAR_DATA} from "@/constants";
import Link from "next/link";
import {useRouter} from "next/router";

import s from './Navbar.module.scss'
import classNames from "classnames";
import {IconPlus} from "@tabler/icons-react";

export function NavBar() {
    const router = useRouter()
    const { query } = router
    return (
        <Stack
            h={'100vh'}
            w={'250px'}
            bg={"blue.0"}
            align="flex-start"
            justify="space-between"
            gap="xs"
        >
            <Box w={'100%'} miw={'250px'}>
                <Flex p={16} columnGap={9} align={'center'}>
                    <Image src={logo.src} alt={''} />
                    <Anchor href="https://www.highflyers.ru" target='_blank' c={'black'} fw={600}>highflyers.ru</Anchor>
                </Flex>
                {
                    NAVBAR_DATA.map(section => (
                        <Box mt={5} mb={15} key={section.title}>
                            <Text c={'blue.9'} mb={5} pl={16} size="xs">{section.title}</Text>
                            {
                                section.links.map(link => {
                                    return (
                                        <Flex className={classNames(s.wrapper, {
                                            [s.wrapper_active]: router.pathname === link.href
                                        })} key={link.text} align='center' pl={16} pr={16} justify={'space-between'}>
                                            <NavLink
                                                key={link.text}
                                                active={link.href === router.pathname}
                                                label={link.text}
                                                component={Link}
                                                className={s.wrapper__link}
                                                fw={600}
                                                style={{ padding: '10px 0px' }}
                                                variant='filled'
                                                noWrap
                                                href={{ pathname: link.href, query: {} }}
                                            />
                                            <IconPlus
                                                color="white"
                                                fill="white"
                                                className={s.wrapper__svg}
                                                style={{ visibility: router.pathname === link.href ? 'visible' : 'hidden' }}
                                                onClick={() => {
                                                    if (link.href === '/cards') {
                                                        router.push({ query: { ...query, form: 'cards' } })
                                                    } else if (link.href === '/articles') {
                                                        router.push({ query: { ...query, form: 'article' } })
                                                    }
                                                }}
                                            />
                                        </Flex>
                                    )
                                })
                            }
                        </Box>
                    ))
                }
            </Box>
            <Text pl={16} pb={20} c={'gray.6'}>piybeep v2.1</Text>
        </Stack >
    );
}