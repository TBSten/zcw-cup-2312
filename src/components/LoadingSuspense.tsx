import { FC, ReactNode, Suspense } from "react"
import CenterLoader from "./CenterLoader"

interface LoadingSuspenseProps {
    children: ReactNode
}
const LoadingSuspense: FC<LoadingSuspenseProps> = ({ children }) => {
    return (
        <Suspense fallback={
            <CenterLoader />
        }>
            {children}
        </Suspense>
    )
}

export default LoadingSuspense
