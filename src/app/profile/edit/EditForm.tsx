"use client"

import { Profile } from "@/auth/type"
import ProfileForm, { profileFormContext } from "@/components/profile/ProfileForm"
import { useMutate } from "@/util/useMutate"
import { Button, Loader } from "@mantine/core"
import { Session } from "next-auth"
import { FC, useContext } from "react"
import { handleSaveProfile } from "./actions"

interface EditFormProps {
    session: Session
    profile: Profile | null
}
const EditForm: FC<EditFormProps> = ({ session, profile }) => {
    return (
        <ProfileForm
            user={session.user}
            defaultValues={{
                name: profile?.name ?? session.user.name ?? "",
                other: profile?.detail ?? "",
                tonamelId: profile?.tonamelId ?? "",
            }}
            actions={
                <ProfileEditActions
                    session={session}
                />
            }
        />
    )
}

export default EditForm

interface ProfileEditActionsProps {
    session: Session
}
const ProfileEditActions: FC<ProfileEditActionsProps> = ({ session }) => {
    const form = useContext(profileFormContext)
    const saveProfile = useMutate(async () => {
        if (!form) throw new Error("not implement")
        if (!form.isValid) return
        await handleSaveProfile(session.user.id, form.data)
    }, {
        onSuccess: { toast: "保存できました！" },
        onError: { toast: "保存できませんでした..." },
    })
    return (
        <div>
            <Button
                disabled={saveProfile.isLoading || !form?.isValid}
                onClick={saveProfile.mutate}
                leftSection={
                    saveProfile.isLoading && <Loader size="sm" />
                }
            >
                保存
            </Button>
        </div>
    )
}
