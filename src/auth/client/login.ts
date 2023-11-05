"use client"

import { SignInOptions, SignOutParams, signIn, signOut } from "next-auth/react"

export const loginGoogle = async (options: SignInOptions = {}) =>
    await signIn("google", options)

export const logout = async (params: SignOutParams = {}) =>
    await signOut(params)
