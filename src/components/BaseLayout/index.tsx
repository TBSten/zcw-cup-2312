"use client"

import { Container } from "@mantine/core"
import { FC, ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"
import styles from "./index.module.css"

interface BaseLayoutProps {
    children?: ReactNode
}
const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <Container>
                <main className={styles.main}>
                    {children}
                </main>
            </Container>
            <Footer />
        </>
    )
}

export default BaseLayout
