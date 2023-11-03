import { ReactNode } from "react"
import SessionProvider from "./SessionProvider"
import StyleProvider from "./StyleProvider"

interface ProvidersProps {
    children?: ReactNode
}
const Providers = ({ children }: ProvidersProps) => {
    return (
        <SessionProvider>
            <StyleProvider>
                {children}
            </StyleProvider>
        </SessionProvider>
    )
}

export default Providers
