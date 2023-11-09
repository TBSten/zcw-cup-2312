import { ReactNode } from "react"
import ReactQueryProvider from "./ReactQueryProvider"
import SessionProvider from "./SessionProvider"
import StyleProvider from "./StyleProvider"
import ToastProvider from "./ToastProvider"

interface ProvidersProps {
    children?: ReactNode
}
const Providers = ({ children }: ProvidersProps) => {
    return (
        <ReactQueryProvider>
            <SessionProvider>
                <StyleProvider>
                    <ToastProvider>
                        {children}
                    </ToastProvider>
                </StyleProvider>
            </SessionProvider>
        </ReactQueryProvider>
    )
}

export default Providers
