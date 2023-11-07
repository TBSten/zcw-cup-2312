import { FC } from "react"
import styles from "./Reward.module.css"

interface RewardProps {
    id: string
    offset?: "bottom-center"
}
const Reward: FC<RewardProps> = ({ id, offset = "bottom-center" }) => {
    return (
        <div id={id} className={styles[offset]} />
    )
}

export default Reward
