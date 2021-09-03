import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = JSON.parse(req.body)

    const updatedData = await prisma.orders.create({
      data: {
        userId: data.userId,
        inventoryId: data.inventoryCode,
        takenById: data.takenById,
        givenById: data.givenById,
        takenAt: data.takenAt,
      },
    })

    res.status(200).json(updatedData)
    await prisma.$disconnect()
}

