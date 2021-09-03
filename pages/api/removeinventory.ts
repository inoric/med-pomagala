import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = JSON.parse(req.body)

  const user = await prisma.inventory.update({
      where: { code: data.id },
      data: { 
          code: data.id + "-DELETED" + Math.floor(Math.random() * 100),
          deleted: true
       }
  })
  res.status(200).json(user)
  await prisma.$disconnect()
}

