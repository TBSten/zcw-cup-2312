import { Loader as MantineLoader } from "@mantine/core"
import { FC } from "react"

interface LoaderProps {
}
const Loader: FC<LoaderProps> = () => {
    return (
        <MantineLoader />
    )
}

export default Loader
