import { FC, ReactNode } from "react"

interface ListProps {
    children?: ReactNode
}
const List: FC<ListProps> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default List
