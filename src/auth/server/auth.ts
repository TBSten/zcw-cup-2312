import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { cache } from "react";
import { authOptions } from "../options";

export const auth = cache(
    (...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) => {
        return getServerSession(...args, authOptions)
    }
)
