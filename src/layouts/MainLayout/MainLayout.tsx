import { NavBar } from "@/components";
import { PopupCards } from "@/modules";
import { Flex, Stack } from "@mantine/core";

export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Flex>
            <PopupCards />
            <NavBar />
            <Stack maw={'1560px'} w={'100%'} style={{ padding: '15px 60px 70px 50px' }}>
                {children}
            </Stack>
        </Flex>
    );
};