import { RefObject, useRef } from "react"

export const useCurrentRef = <Value,>(value: Value): RefObject<Value> => {
    const ref = useRef(value)
    ref.current = value
    return ref
}
