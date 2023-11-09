import { Box } from '@mantine/core'
import { NextPage } from 'next'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}
const ProfileLayout: NextPage<Props> = async ({ children }) => {
    return (
        <div>
            <Box my="md">
                {children}
            </Box>
        </div>
    )
}
export default ProfileLayout
