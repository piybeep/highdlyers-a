import {NavBar} from "@/components";
import {Flex, Stack} from "@mantine/core";
import {PropsWithChildren} from "react";

export function MainLayout({ children }: PropsWithChildren) {
    return (
        <Flex>
            <NavBar />
            <Stack maw={'1560px'} w={'100%'} style={{ padding: '15px 60px 70px 50px' }}>
                {children}
            </Stack>
        </Flex>
    );
}