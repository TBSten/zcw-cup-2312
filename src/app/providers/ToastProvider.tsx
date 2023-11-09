import { FC, ReactNode } from "react";
import { Toaster } from 'react-hot-toast';

interface ToastProviderProps {
    children: ReactNode
}
const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
    return (
        <>
            {children}
            <Toaster />
        </>
    )
}

export default ToastProvider
