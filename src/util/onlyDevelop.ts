import { notFound } from "next/navigation"

export const onlyDevelopPage = () => {
    if (process.env.NODE_ENV !== "development") notFound()
}

export const onlyDevelopFunction = (func: Function) => () => {
    if (process.env.NODE_ENV !== "development") throw new Error("this function only development . but run production")
    return func()
}
