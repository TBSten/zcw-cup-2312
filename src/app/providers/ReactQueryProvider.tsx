import { FC, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

interface ReactQueryProviderProps {
    children: ReactNode
}
const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider

