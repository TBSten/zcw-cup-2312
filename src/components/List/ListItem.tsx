import clsx from "clsx"
import { ComponentProps, FC, ReactNode } from "react"
import styles from "./ListItem.module.css"

interface ListItemProps extends ComponentProps<"li"> {
    children?: ReactNode
    selected?: boolean
    icon?: ReactNode
}
const ListItem: FC<ListItemProps> = ({
    children,
    className,
    selected = false,
    icon,
    ...divProps
}) => {
    return (
        <li className={clsx(styles.container, className, selected && styles.selected)} {...divProps}>
            <div className={styles.icon}>
                {icon}
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </li>
    )
}

export default ListItem
