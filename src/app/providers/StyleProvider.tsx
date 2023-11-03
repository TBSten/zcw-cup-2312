"use client"
import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { FC, ReactNode } from "react"

interface StyleProviderProps {
    children: ReactNode
}
const StyleProvider: FC<StyleProviderProps> = ({ children }) => {
    return (
        <MantineProvider>
            {children}
        </MantineProvider>
    )
}

export default StyleProvider
