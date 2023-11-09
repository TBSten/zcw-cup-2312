"use client"
import { cardCategoryText, cardTypeText } from "@/deck/card/text"
import { Card } from "@/deck/card/type"
import { Box, Button, Flex, List, Modal, Pill, Text } from "@mantine/core"
import Image from "next/image"
import { FC, ReactNode, memo, useCallback, useState } from "react"
import ListItem from "../List/ListItem"
import styles from "./CardInput.module.css"

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
    const handleChangeSelected = useCallback(onChangeSelected, [onChangeSelected])

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

            <CardInputModal
                onClose={() => setOpen(false)}
                onChangeSelected={handleChangeSelected}
                {...{ open, index, cards, selectedCard }}
            />

        </>
    )
}

export default memo(CardInput)


interface CardInputModalProps {
    open: boolean
    onClose: () => void
    index?: number
    cards: Card[]
    onChangeSelected: (card: Card | null) => void
    selectedCard: Card | null
}
const CardInputModal = memo(function CardInputModal({
    cards, index, onChangeSelected, onClose, open, selectedCard,
}: CardInputModalProps) {
    return (
        <Modal
            opened={open}
            onClose={onClose}
            title={`${index ? index + ". の" : ""}カードを選択`}
        >
            <List>
                {cards.map(card =>
                    <CardInputModalListItem key={card.id}
                        selected={card.id === selectedCard?.id}
                        {...{ card, onChangeSelected }}
                    />
                )}
            </List>
            <div className={styles.modalFooter}>
                <Button my="md" onClick={onClose}>
                    OK
                </Button>
            </div>
        </Modal>
    )
})

interface CardInputModalListItemProps {
    card: Card
    selected: boolean
    onChangeSelected: (card: Card | null) => void
}
const CardInputModalListItem = memo(function CardInputModalListItem({ card, selected, onChangeSelected }: CardInputModalListItemProps) {
    console.log("card input modal listitem")
    return (
        <ListItem
            key={card.id}
            selected={selected}
            onClick={() => onChangeSelected(selected ? null : card)}
            icon={
                <Image
                    src={card.resized_image?.url ?? "/default-icon.png"}
                    alt={card.name ?? "不明なカード"}
                    width={50}
                    height={50}
                    style={{ objectFit: "contain", width: "auto" }}
                />
            }
        >
            <Pill>{cardCategoryText[card.category]} {card.no}</Pill>
            <div>
                {card.name}
            </div>
            {card.type &&
                <Text c="dimmed" size="xs">
                    {cardTypeText[card.type]}
                </Text>
            }
        </ListItem>
    )
})

