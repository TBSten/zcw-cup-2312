import SectionTitle from "@/components/SectionTitle"
import ProfileForm from "./ProfileForm"

export default async function JoinEntryProfilePage() {
    return (
        <div>
            <SectionTitle>
                プロフィールを入力する
            </SectionTitle>

            <ProfileForm
                defaultValues={{
                    name: "",
                    tonamelId: "",
                    other: "",
                }}
            />
        </div>
    )
}
