"use client"
import { Card } from "@/deck/card/type"
import { Box, Button, Flex, List, Modal } from "@mantine/core"
import { FC, ReactNode, memo, useState } from "react"
import ListItem from "../List/ListItem"

interface CardInputProps {
    selectedCard: Card | null
    cards: Card[]
    placeholder?: ReactNode
    index?: number
    onChangeSelected: (card: Card | null) => void
}
const CardInput: FC<CardInputProps> = ({
    selectedCard,
    placeholder = "カードを選択してください",
    index,
    cards,
    onChangeSelected,
}) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <ListItem onClick={() => setOpen(true)}>
                <Flex w="100%">
                    <Box style={{}}>
                        {typeof index === "number" && `${index}. `}
                    </Box>
                    <Box style={{ flexGrow: 1 }}>
                        {selectedCard?.name ?? placeholder}
                    </Box>
                </Flex>
            </ListItem>

            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title={`${index ? index + ". の" : ""}カードを選択`}
            >
                <List>
                    {cards.map(card =>
                        <ListItem
                            key={card.id}
                            selected={card.id === selectedCard?.id}
                            onClick={() => onChangeSelected(selectedCard?.id === card.id ? null : card)}
                        >
                            {card.name}
                        </ListItem>
                    )}
                </List>
                <Button mt="md" onClick={() => setOpen(false)}>
                    OK
                </Button>
            </Modal>

        </>
    )
}

export default memo(CardInput)

