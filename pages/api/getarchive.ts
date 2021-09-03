import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async (req: NextApiRequest, res: NextApiResponse) => {
    let finalData = []
    const data = await prisma.orders.findMany();
    

    // get user name from id
    for (let i = 0; i < data.length; i++) {
        const user = await prisma.users.findFirst({
            where: {
                id: data[i].userId
            }
        }) || { name: 'unknown', lastname: 'unknown', phone: 'unknown' , address: 'unknown'}
        const takenBy = await prisma.users.findFirst({
            where: {
                id: data[i].takenById
            }
        }) || { name: 'unknown', lastname: 'unknown', phone: 'unknown' , address: 'unknown'}
        const inventory = await prisma.inventory.findFirst({
            where: {
                code: data[i].inventoryId
            }
        }) || { itemId: 1, code: 'unknown' }
        const item = await prisma.items.findFirst({
            where: {
                id: inventory.itemId
            }
        }) || { name: 'unknown' }
        const returned = await prisma.returns.findFirst({
            where: {
                orderId: data[i].id
            }
        }) || { returnedAt: 'unknown' }
        finalData.push({
            id: data[i].id,
            name: user.name + " " + user.lastname,
            phone: user.phone,
            address: user.address,
            itemName: item.name,
            date: data[i].takenAt,
            inventoryCode: inventory.code,
            takenBy: takenBy.name + " " + takenBy.lastname,
            takenByPhone: takenBy.phone,
            takenByAddress: takenBy.address,
            returnedAt: returned.returnedAt
        })
    }

    res.status(200).json(finalData)
    await prisma.$disconnect()
}

