import clsx from "clsx"
import { ComponentProps, FC, ReactNode } from "react"
import styles from "./ListItem.module.css"

interface ListItemProps extends ComponentProps<"div"> {
    children?: ReactNode
    selected?: boolean
}
const ListItem: FC<ListItemProps> = ({ children, className, selected = false, ...divProps }) => {
    return (
        <div className={clsx(styles.container, className, selected && styles.selected)} {...divProps}>
            {children}
        </div>
    )
}

export default ListItem
