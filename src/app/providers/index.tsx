import { ReactNode } from "react"
import ReactQueryProvider from "./ReactQueryProvider"
import SessionProvider from "./SessionProvider"
import StyleProvider from "./StyleProvider"

interface ProvidersProps {
    children?: ReactNode
}
const Providers = ({ children }: ProvidersProps) => {
    return (
        <ReactQueryProvider>
            <SessionProvider>
                <StyleProvider>
                    {children}
                </StyleProvider>
            </SessionProvider>
        </ReactQueryProvider>
    )
}

export default Providers
