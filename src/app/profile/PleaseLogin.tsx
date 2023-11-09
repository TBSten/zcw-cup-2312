import Banner from "@/components/Banner"
import { FC } from "react"

interface PleaseLoginProps {
}
const PleaseLogin: FC<PleaseLoginProps> = () => {
    return (
        <div>
            <Banner type="warn">
                ログインしていません
            </Banner>
        </div>
    )
}

export default PleaseLogin
