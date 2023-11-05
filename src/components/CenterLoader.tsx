import { Center, Loader } from "@mantine/core"
import { FC } from "react"

interface CenterLoaderProps {
}
const CenterLoader: FC<CenterLoaderProps> = () => {
    return (
        <Center>
            <Loader />
        </Center>
    )
}

export default CenterLoader
