"use client"

import Banner from "@/components/Banner"
import Reward from "@/components/reward/Reward"
import { sleep } from "@/util/sleep"
import { useMutate } from "@/util/useMutate"
import { Button, Loader } from "@mantine/core"
import { User } from "next-auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useContext } from "react"
import { useReward } from "react-rewards"
import ProfileForm, { profileFormContext } from "../../../components/profile/ProfileForm"
import { Step, getNextStep, getPrevStep, getStepPath } from "../steps"
import { handleSaveProfile } from "./actions"

interface JoinProfileFormProps {
    user: User
    defaultValues: {
        name: string
        tonamelId: string
        other: string
    }
}
const JoinProfileForm: FC<JoinProfileFormProps> = ({ defaultValues, user }) => {
    return (
        <>
            <ProfileForm
                user={user}
                defaultValues={defaultValues}
                actions={<JoinProfileFormActions user={user} />}
            />
        </>
    )
}

export default JoinProfileForm

interface JoinProfileFormActionsProps {
    user: User
}
const JoinProfileFormActions: FC<JoinProfileFormActionsProps> = ({ user }) => {
    const context = useContext(profileFormContext)
    const isValid = context?.isValid
    const profile = context?.data

    const segment = "entry-profile"
    const nextStepPath = getStepPath(getNextStep(segment) as Step)
    const prevStepPath = getStepPath(getPrevStep(segment) as Step)

    const goodRewardId = "good-profile"
    const { reward } = useReward(goodRewardId, "emoji", { emoji: ["👍", "❤️"] })

    const router = useRouter()
    const saveProfile = useMutate(async () => {
        if (!profile) throw new Error("invalid profile : can not get profile :" + profile)
        console.log(user.id, profile)
        await handleSaveProfile(user.id, profile)
        reward()
        await sleep(1000)
        router.push(nextStepPath)
    })

    return (
        <>
            <Banner type="info">
                プロフィールはあとで編集できます。
            </Banner>

            <div>
                <Button component={Link} href={prevStepPath} variant="default">
                    戻る
                </Button>
                <Button
                    onClick={saveProfile.mutate}
                    disabled={!isValid || saveProfile.isLoading || saveProfile.isSuccess}
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
                <Reward id={goodRewardId} />
            </div>
        </>
    )
}
