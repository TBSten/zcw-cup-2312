"use client"
import FullScreenWidth from "@/components/BaseLayout/FullScreenWidth"
import { Box, Container, Stepper } from "@mantine/core"
import { useSelectedLayoutSegment } from "next/navigation"
import { FC, useEffect, useRef } from "react"
import { getStepIndex, steps } from "../steps"
import styles from "./StepBar.module.css"

interface StepBarProps {
}
const StepBar: FC<StepBarProps> = () => {
    const segment = useSelectedLayoutSegment()
    const refs = useRef<HTMLButtonElement[]>([])
    useEffect(() => {
        if (!segment) return
        const index = getStepIndex(segment)
        console.log("index", index)
        refs.current[index].scrollIntoView({ inline: "start", behavior: "smooth" })
    }, [segment])
    return (
        <FullScreenWidth>
            <Container style={{ overflowX: "auto" }}>
                <Box w="100%" py="xs">
                    <Stepper active={getStepIndex(segment ?? steps[0])} classNames={{ steps: styles.steps }}>
                        {steps.map((step, index) =>
                            <Stepper.Step
                                key={step.segment}
                                label={step.label}
                                style={{ minWidth: "fit-content" }}
                                ref={ref => {
                                    if (ref instanceof HTMLButtonElement) {
                                        refs.current[index] = ref
                                    }
                                }}
                            />
                        )}
                    </Stepper>
                </Box>
            </Container>
        </FullScreenWidth>
    )
}

export default StepBar
