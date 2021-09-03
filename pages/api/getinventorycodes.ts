import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const raw = JSON.parse(req.body)
    const inventory = await prisma.inventory.findMany({
        where: {
            itemId: raw.item
        },
        orderBy: {
            code: 'asc'
        }
    });
    let available = false
    let data: {id: number, code: string, available: boolean}[] = []
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
        data.push({
            id: inv.id,
            code: inv.code,
            available: available
        })
    }
    res.status(200).json(data)
    await prisma.$disconnect()
}

