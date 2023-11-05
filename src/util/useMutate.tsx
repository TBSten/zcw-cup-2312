import { useRef, useState } from "react"

export const useMutate = <F extends ((...args: any[]) => any)>(handler: F) => {
    const handlerRef = useRef(handler)
    handlerRef.current = handler

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<unknown>(null)
    const isError = !!error
    const [result, setResult] = useState<ReturnType<F> | null>(null)

    const mutate = () => {
        setIsLoading(true)
        try {
            const result = handlerRef.current()
            if (result instanceof Promise) {
                result
                    .then(result => {
                        setResult(result)
                        setIsLoading(false)
                    })
                    .catch(error => {
                        setError(error)
                    })
            } else {
                setResult(result)
            }
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        mutate,
        isLoading,
        isError,
        error,
        result,
    }
}
