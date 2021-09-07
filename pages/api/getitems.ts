import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../components/client";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await prisma.items.findMany();
    res.status(200).json(data)
}

