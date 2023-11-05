import { Alert, DefaultMantineColor } from "@mantine/core"
import { FC, ReactNode } from "react"
import { AiOutlineInfoCircle } from "react-icons/ai"

type BannerType = "info" | "warn"
const typeColorMap: Record<BannerType, DefaultMantineColor> = {
    "info": "blue",
    "warn": "yellow",
}

interface BannerProps {
    type?: BannerType
    children?: ReactNode
}
const Banner: FC<BannerProps> = ({ type = "info", children }) => {
    return (
        <Alert
            color={typeColorMap[type]}
            icon={<AiOutlineInfoCircle />}
        >
            {children}
        </Alert>
    )
}

export default Banner
