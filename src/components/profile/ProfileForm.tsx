"use client"

import { Profile } from "@/auth/type"
import { Box, TextInput, Textarea } from "@mantine/core"
import { User } from "next-auth"
import { FC, ReactNode, createContext, useMemo, useState } from "react"

export const profileFormContext = createContext<null | { isValid: boolean, data: Profile }>(null)

interface ProfileFormProps {
    user: User
    defaultValues: {
        name: string
        tonamelId: string
        other: string
    }
    actions: ReactNode
}
const ProfileForm: FC<ProfileFormProps> = ({ user, defaultValues, actions }) => {
    const [name, setName] = useState(defaultValues.name)
    const isValidName = name.trim().length >= 1

    const [tonamelId, setTonamelId] = useState(defaultValues.tonamelId)
    const isValidTonamelId = tonamelId.trim().length >= 1

    const [other, setOther] = useState(defaultValues.other)
    const isValidOther = true

    const isValid = isValidName && isValidTonamelId && isValidOther

    const profile: Profile = useMemo(() => ({
        name,
        icon: "/default-icon.png",
        detail: other,
        tonamelId,
    }), [name, other, tonamelId])

    return (
        <Box py="md">
            <profileFormContext.Provider value={{ isValid, data: profile }}>
                <TextInput
                    label="ニックネーム"
                    description="参加者一覧ページなどに表示されます。"
                    required
                    my="md"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    error={!isValidName ? "入力値が不正です。" : null}
                    autoFocus
                />
                <TextInput
                    label="Tonamel のID"
                    description={<>
                        トナメルのIDを入力してください。<br />
                        トナメルのIDはトナメルにログイン後、右上のアイコンをクリックすると表示されます。
                    </>}
                    required
                    my="md"
                    value={tonamelId}
                    onChange={e => setTonamelId(e.target.value)}
                    error={!isValidTonamelId ? "入力値が不正です。" : null}
                />
                <Textarea
                    label="その他"
                    description="運営に伝えておきたいことがあれば入力してください。"
                    my="md"
                    rows={3}
                    value={other}
                    onChange={e => setOther(e.target.value)}
                    error={!isValidOther ? "入力値が不正です。" : null}
                />

                <div>
                    {actions}
                </div>
            </profileFormContext.Provider>
        </Box>
    )
}

export default ProfileForm
