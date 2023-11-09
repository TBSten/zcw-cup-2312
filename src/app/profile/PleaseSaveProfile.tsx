import Banner from "@/components/Banner"
import Link from "@/components/Link"
import { FC } from "react"

interface PleaseSaveProfileProps {
}
const PleaseSaveProfile: FC<PleaseSaveProfileProps> = () => {
    return (
        <div>
            <Banner type="warn">
                プロフィールが登録されていません。
                <div>
                    <Link href="/profile/edit">
                        プロフィールを登録する
                    </Link>
                </div>
            </Banner>
        </div>
    )
}

export default PleaseSaveProfile
