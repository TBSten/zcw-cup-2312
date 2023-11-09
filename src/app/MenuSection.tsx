import CupInfoImage from "@/../public/cup-info.png"
import DeckAndProfileImage from "@/../public/deck-and-profile.png"
import SectionTitle from "@/components/SectionTitle"
import { SimpleGrid, Space } from "@mantine/core"
import { FC } from "react"
import TopMenuCard from "./_components/TopMenuCard"

interface MenuSectionProps {
}
const MenuSection: FC<MenuSectionProps> = () => {
    return (
        <div>
            <SectionTitle>
                メニュー
            </SectionTitle>
            <SimpleGrid cols={{ xs: 1, sm: 3, lg: 4 }}>
                <TopMenuCard
                    image={{
                        src: DeckAndProfileImage,
                        alt: "デッキとプロフィール",
                        priority: true,
                    }}
                    title="デッキとプロフィール"
                    href="/profile"
                />
                <TopMenuCard
                    image={{
                        src: CupInfoImage,
                        alt: "参加者情報",
                        priority: true,
                    }}
                    title="参加者情報"
                    href="/participants"
                />
                <TopMenuCard
                    image={{
                        src: CupInfoImage,
                        alt: "大会情報",
                        priority: true,
                    }}
                    title="大会情報"
                    href="/about"
                />
            </SimpleGrid>
            <Space h="md" />
        </div>
    )
}

export default MenuSection
