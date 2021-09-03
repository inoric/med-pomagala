import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await prisma.users.findMany({
        where: {
            deleted: false
        }
    });
    res.status(200).json(data)
    await prisma.$disconnect()
}

