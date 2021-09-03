import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = JSON.parse(req.body)

    const updatedData = await prisma.users.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        address: data.address,
        phone: data.phone,
        superuser: false
      },
    })

    res.status(200).json(updatedData)
    await prisma.$disconnect()

}

