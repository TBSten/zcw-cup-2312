import { Anchor } from "@mantine/core"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { FC, ReactNode } from "react"

interface LinkProps extends NextLinkProps {
    children: ReactNode
}
const Link: FC<LinkProps> = ({ children, ...props }) => {
    return (
        <Anchor component={NextLink} {...props}>
            {children}
        </Anchor>
    )
}

export default Link
