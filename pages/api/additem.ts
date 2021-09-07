import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../components/client"


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = JSON.parse(req.body)
    //count rows where name = data.name
    const itemid = await prisma.items.findFirst({
      where: {
        name: data.itemName,
      },
  })
    if(itemid === null){
      const updatedData = await prisma.items.create({
          data: {
            name: data.itemName,
          },
      })
      const updated2Data = await prisma.inventory.create({
        data: {
          itemId: updatedData.id,
          code: data.inventoryCode,
        },
      })
    }else{
      const updated2Data = await prisma.inventory.create({
        data: {
          itemId: itemid.id,
          code: data.inventoryCode,
        },
      })
    }

    
    

    res.status(200).json({})
}

