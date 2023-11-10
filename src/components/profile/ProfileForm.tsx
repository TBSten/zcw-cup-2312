"use client"

import { Profile } from "@/auth/type"
import { upload } from "@/image/upload"
import { useMutate } from "@/util/useMutate"
import { Box, Button, FileButton, Input, Loader, Stack, TextInput, Textarea } from "@mantine/core"
import { User } from "next-auth"
import Image from "next/image"
import { FC, ReactNode, createContext, useMemo, useState } from "react"

export const profileFormContext = createContext<null | { isValid: boolean, data: Profile }>(null)

interface ProfileFormProps {
    user: User
    defaultValues: {
        name: string
        tonamelId: string
        detail: string
        icon: string
    }
    actions: ReactNode
}
const ProfileForm: FC<ProfileFormProps> = ({ user, defaultValues, actions }) => {
    const [name, setName] = useState(defaultValues.name)
    const isValidName = name.trim().length >= 1

    const [tonamelId, setTonamelId] = useState(defaultValues.tonamelId)
    const isValidTonamelId = tonamelId.trim().length >= 1

    const [detail, setDetail] = useState(defaultValues.detail)
    const isValidDetail = true

    const [icon, setIcon] = useState(defaultValues.icon)
    const isValidIcon = true

    const isValid = isValidName && isValidTonamelId && isValidDetail && isValidIcon

    const profile: Profile = useMemo(() => ({
        name,
        icon,
        detail: detail,
        tonamelId,
    }), [name, icon, detail, tonamelId])

    const handleChangeProfileIcon = useMutate(async (file: File | null) => {
        if (!file) return
        const imageUrl = await upload(file)
        setIcon(imageUrl)
    })

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
                <Input.Wrapper
                    label="アイコン"
                >
                    <Stack gap="xs">
                        <Image
                            src={icon}
                            alt={name}
                            width={200}
                            height={200}
                            style={{ objectFit: "cover", border: "solid 1px gray" }}
                        />
                        <FileButton
                            onChange={handleChangeProfileIcon.mutate}
                            accept="image/*"
                        >
                            {(props) =>
                                <Button
                                    variant="light"
                                    w="fit-content"
                                    disabled={handleChangeProfileIcon.isLoading}
                                    leftSection={handleChangeProfileIcon.isLoading && <Loader size="sm" />}
                                    {...props}
                                >
                                    画像を変更
                                </Button>
                            }
                        </FileButton>
                    </Stack>
                </Input.Wrapper>
                <Textarea
                    label="その他"
                    description="運営に伝えておきたいことがあれば入力してください。"
                    my="md"
                    rows={3}
                    value={detail}
                    onChange={e => setDetail(e.target.value)}
                    error={!isValidDetail ? "入力値が不正です。" : null}
                />

                <div>
                    {actions}
                </div>
            </profileFormContext.Provider>
        </Box>
    )
}

export default ProfileForm
