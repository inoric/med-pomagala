import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = JSON.parse(req.body)

  const user = await prisma.users.update({
      where: { id: Number(data.id) },
      data: { 
          deleted: true
       }
  })
  res.status(200).json(user)
  await prisma.$disconnect()
}

