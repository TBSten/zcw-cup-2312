"use server"
import { getProfile } from "@/auth/server/getProfile"
import { getDeck } from "@/deck/server/get"

export const getProfileAction = getProfile

export const getDeckAction = getDeck
