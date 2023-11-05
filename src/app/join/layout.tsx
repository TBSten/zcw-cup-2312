import SectionTitle from "@/components/SectionTitle"
import { Divider } from "@mantine/core"
import { ReactNode } from "react"
import StepBar from "./_components/StepBar"

export default async function JoinLayout({
    children,
}: {
    children?: ReactNode
}) {
    return (
        <div>
            <SectionTitle>
                大会参加フロー
            </SectionTitle>
            <StepBar />
            <Divider />
            <div>
                {children}
            </div>
        </div>
    )
}