import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = JSON.parse(req.body)
    //count rows where name = data.name
    const count = await prisma.items.count({
        where: {
            name: data.itemName
        }
    })
    if(count === 0){
      const updatedData = await prisma.items.create({
          data: {
            name: data.itemName,
          },
      })
    }
    const itemid = await prisma.items.findFirst({
        where: {
          name: data.itemName,
        },
    }) || {id: 1}
    const updated2Data = await prisma.inventory.create({
      data: {
        itemId: itemid.id,
        code: data.inventoryCode,
      },
    })

    res.status(200).json(updated2Data)
    await prisma.$disconnect()
}

