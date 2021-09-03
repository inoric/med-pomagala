import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = JSON.parse(req.body)

    const updatedData = await prisma.returns.create({
      data: {
        orderId: data.orderId,
        TakenById: data.takenByid,
        returnedAt: data.returnedAt,
      },
    })

    res.status(200).json(updatedData)
    await prisma.$disconnect()
}

