"use client"
import { Badge, Card, Group, Text } from "@mantine/core";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { ComponentProps, FC, ReactNode } from "react";

interface TopMenuCardProps {
    image?: ImageProps
    title?: ReactNode
    badge?: ReactNode
    children?: ReactNode
    className?: string
    href?: string
}
const TopMenuCard: FC<TopMenuCardProps> = ({ image, title, badge, children, className, href }) => {
    const cardProps: ComponentProps<typeof Card> = href
        ? { component: Link, href, target: href.startsWith("/") ? "" : "_blank" }
        : {}
    return (
        <Card
            padding="sm"
            radius="md"
            withBorder
            shadow="sm"
            className={className}
            {...cardProps}
        >
            {image &&
                <Card.Section>
                    {/* eslint-disable-next-line jsx-a11y/alt-text*/}
                    <Image
                        {...image}
                        style={{ width: "100%", height: "auto" }}
                    />
                </Card.Section>
            }
            {(title || badge) &&
                <Group justify="space-between" mt={{ sm: "sm", md: "md" }} mb="xs">
                    {title &&
                        <Text fw={500}>{title}</Text>
                    }
                    {badge &&
                        <Badge color="pink" variant="light">
                            {badge}
                        </Badge>
                    }
                </Group>
            }
            {children}
        </Card>
    )
}

export default TopMenuCard
