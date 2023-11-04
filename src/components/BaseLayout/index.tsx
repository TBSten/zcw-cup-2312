"use client"

import { AppShell, Container } from "@mantine/core"
import { FC, ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"

interface BaseLayoutProps {
    children?: ReactNode
}
const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
    return (
        <AppShell
            header={{ height: 60 }}
        >
            <Header />

            <AppShell.Main px={0}>
                <Container>
                    {children}
                </Container>
            </AppShell.Main>
            <Footer />
        </AppShell>
    )
}

export default BaseLayout
