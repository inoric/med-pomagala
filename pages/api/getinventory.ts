import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async (req: NextApiRequest, res: NextApiResponse) => {
    let fullInventory: 
    {name: string;
        items: 
        {  
            available: boolean;
            code: string;
        }[]
    }[] = []
    let available = false
    let maderfaker = []
    let shortInventory: {available: boolean; code: string}[] = []
    const items = await prisma.items.findMany();

    for (let i = 0; i < items.length; i++) {
        shortInventory = []
        let item = items[i];
        let inventory = await prisma.inventory.findMany({
            where: {
                itemId: item.id,
                deleted: false
            },
            orderBy: {
                code: "asc"
            }
        })

        for (let j = 0; j < inventory.length; j++) {
            let inv = inventory[j]
            let order = await prisma.orders.findFirst({
                where: {
                    inventoryId: inv.code
                },
                orderBy: {
                    id: "desc"
                }
            })
            available = false
            if(order !== null) {
                let returns = await prisma.returns.count({
                    where: {
                        orderId: order.id
                    }
                })
                
                if(returns > 0) {
                    available = true
                }
            }else{
                available = true 
            }
            shortInventory.push({
                available: available,
                code: inv.code
            })
            

        }
        maderfaker.push(shortInventory)
        fullInventory.push({
            name: item.name,
            items: shortInventory
        })

    }
    

    res.status(200).json({fullInventory})
    await prisma.$disconnect()
}

