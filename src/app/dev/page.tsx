"use client"

import { onlyDevelopPage } from "@/util/onlyDevelop"
import { useMutate } from "@/util/useMutate"
import { Loader } from "@mantine/core"
import { FC } from "react"
import * as _actions from "./actions"

const actions = {
    ..._actions,
}

interface DevPageProps {
}
const DevPage: FC<DevPageProps> = () => {
    onlyDevelopPage()
    return (
        <div>
            {Object.entries(actions).map(([name, action]) => (
                <div key={name}>
                    <DevMenuItem name={name} onRun={action} />
                </div>
            ))}
        </div>
    )
}

export default DevPage

interface DevMenuItemProps {
    name: string
    onRun: () => Promise<void>
}
const DevMenuItem: FC<DevMenuItemProps> = ({ name, onRun }) => {
    const { isLoading, isSuccess, isError, mutate } = useMutate(onRun)
    return (
        <button key={name} onClick={() => mutate(null)} disabled={isLoading}>
            {isLoading && <Loader size="sm" />}
            {isSuccess && "✅"}
            {isError && "❌"}
            {" "}
            {name}
        </button>
    )
}
