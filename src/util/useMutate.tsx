import toast from "react-hot-toast"
import { useMutation } from "react-query"

interface UseMutateOptions {
    onSuccess: { toast: JSX.Element | string }
    onError: { toast: JSX.Element | string }
}
export const useMutate = <F extends ((...args: any[]) => any)>(
    handler: F,
    options: Partial<UseMutateOptions> = {},
) => {
    const { mutateAsync, isLoading, isError, error, data, isSuccess } = useMutation(handler, {
        onSuccess: () => {
            if (options.onSuccess) toast.success(options.onSuccess.toast, {
                position: "bottom-center",
            })
        },
        onError: () => {
            if (options.onError) toast.error(options.onError.toast, {
                position: "bottom-center",
            })
        },
    })
    return {
        mutate: mutateAsync,
        isLoading,
        isError,
        error,
        isSuccess,
        result: data,
    }
}
