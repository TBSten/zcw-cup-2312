import { Title } from "@mantine/core"
import { FC, ReactNode } from "react"

interface SectionTitleProps {
    children: ReactNode
}
const SectionTitle: FC<SectionTitleProps> = ({ children }) => {
    return (
        <Title order={2} mt="md" mb="sm">
            {children}
        </Title>
    )
}

export default SectionTitle
