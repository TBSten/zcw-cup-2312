import { ReactNode } from "react"

export interface Step {
    segment: string
    label: ReactNode

}
export type StepOrSegment = Step | Step["segment"]

export const steps: Step[] = [
    {
        segment: "login",
        label: "ログイン",
    },
    {
        segment: "entry-profile",
        label: "プロフィール",
    },
    {
        segment: "entry-deck",
        label: "デッキ",
    },
]

export const getNextStep = (step: StepOrSegment) => {
    const index = getStepIndex(step)
    if (index < 0) return null
    return steps[index + 1]
}

export const getPrevStep = (step: StepOrSegment) => {
    const index = getStepIndex(step)
    if (index <= 0) return null
    return steps[index - 1]
}

export const getStepSegment = (step: StepOrSegment) =>
    typeof step === "string"
        ? step
        : step.segment

export const getStepIndex = (step: StepOrSegment) =>
    steps.findIndex(s =>
        getStepSegment(step) === s.segment
    )

export const getStepPath = (step: StepOrSegment) =>
    `/join/${getStepSegment(step)}`
