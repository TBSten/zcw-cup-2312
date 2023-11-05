"use client"

import Banner from "@/components/Banner"
import { useMutate } from "@/util/useMutate"
import { Box, Button, Loader, TextInput, Textarea } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { Step, getNextStep, getPrevStep, getStepPath } from "../steps"

interface ProfileFormProps {
    defaultValues: {
        name: string
        tonamelId: string
        other: string
    }
}
const ProfileForm: FC<ProfileFormProps> = ({ defaultValues }) => {
    const segment = "entry-profile"
    const nextStepPath = getStepPath(getNextStep(segment) as Step)
    const prevStepPath = getStepPath(getPrevStep(segment) as Step)

    const [name, setName] = useState(defaultValues.name)
    const isValidName = name.trim().length >= 1

    const [tonamelId, setTonamelId] = useState(defaultValues.tonamelId)
    const isValidTonamelId = tonamelId.trim().length >= 1

    const [other, setOther] = useState(defaultValues.other)
    const isValidOther = true

    const isValid = isValidName && isValidTonamelId && isValidOther

    const router = useRouter()
    const saveProfile = useMutate(async () => {
        // TODO save profile
        console.log("save profile", { name, tonamelId, other })
        router.push(nextStepPath)
    })

    return (
        <Box py="md">
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

            <Banner type="info">
                プロフィールはあとで編集できます。
            </Banner>

            <Button component={Link} href={prevStepPath} variant="default">
                戻る
            </Button>
            <Button
                onClick={saveProfile.mutate}
                disabled={!isValid || saveProfile.isLoading}
                leftSection={<>{saveProfile.isLoading && <Loader />}</>}
            >
                プロフィールを保存
            </Button>
            {saveProfile.isError &&
                <Banner type="error">
                    保存できませんでした...
                    もう一度保存し直してください。
                </Banner>
            }
        </Box>
    )
}

export default ProfileForm
