import { Anchor, Box, Button, Flex, Image, NavLink, Stack, Text, Title } from "@mantine/core";

import logo from '@/public/imgs/miniLogo.svg'
import { NAVBAR_DATA } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/router";

import s from './Navbar.module.scss'
import classNames from "classnames";

export function NavBar() {
    const router = useRouter()
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
                    <Image src={logo.src} />
                    <Anchor href="https://www.highflyers.ru" target='_blank' c={'black'} fw={600}>highflyers.ru</Anchor>
                </Flex>
                {
                    NAVBAR_DATA.map(section => (
                        <Box mt={5} mb={15} key={section.title}>
                            <Text c={'blue.9'} mb={5} pl={16} size="xs">{section.title}</Text>
                            {
                                section.links.map(link => {
                                    return (
                                        // Вариант криво рабочий, но он мне больше нравится
                                        // <NavLink
                                        //     key={link.text}
                                        //     active={link.href === router.pathname}
                                        //     label={link.text}
                                        //     component={Link}
                                        //     className={s.link}
                                        //     fw={600}
                                        //     style={{ padding: '10px 16px' }}
                                        //     variant='filled'
                                        //     noWrap
                                        //     href={link.href}
                                        //     rightSection={
                                        //         <svg
                                        //             onClick={(e) => {
                                        //                 console.log(router)
                                        //                 router.push({ pathname: router.pathname, query: { formCards: 'opened' } })
                                        //             }}
                                        //             className={s.wrapper__svg}
                                        //             style={{ visibility: router.pathname === link.href ? 'visible' : 'hidden' }}
                                        //             xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        //             <path d="M12 5V19M5 12H19" stroke={router.pathname === link.href ? "white" : 'transpanent'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        //         </svg>
                                        //     }
                                        // />
                                        // Вариант рабочий, но мне не нравится
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
                                                href={link.href}
                                            />
                                            <svg
                                                onClick={() => {
                                                    console.log(router)
                                                    if (link.href === '/cards') {
                                                        router.push({ pathname: router.pathname, query: { formCards: 'opened' } })
                                                    } else if (link.href === '/articles') {
                                                        router.push({ pathname: router.pathname, query: { formArticles: 'opened' } })
                                                    }
                                                }}
                                                className={s.wrapper__svg}
                                                style={{ visibility: router.pathname === link.href ? 'visible' : 'hidden' }}
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 5V19M5 12H19" stroke={router.pathname === link.href ? "white" : 'transpanent'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
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
};