import { useMutation } from "react-query"

export const useMutate = <F extends ((...args: any[]) => any)>(handler: F) => {
    const { mutateAsync, isLoading, isError, error, data } = useMutation(handler)
    return {
        mutate: mutateAsync,
        isLoading,
        isError,
        error,
        result: data,
    }
}
