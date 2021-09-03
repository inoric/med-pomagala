import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default async (req: NextApiRequest, res: NextApiResponse) => {
    let finalData = []
    let filteredData: Array<{id: number, userId: number, inventoryId: string, takenById: number, givenById: number, takenAt: string }> = []
    const data = await prisma.orders.findMany();
    const filter = await prisma.returns.findMany();
    
    // filter all orders that havent been returned yet
    data.forEach(order => {
        if(!filter.find(returned => returned.orderId === order.id)){
            filteredData.push(order)
        }
    })

    // get user name from id
    for (let i = 0; i < filteredData.length; i++) {
        const user = await prisma.users.findFirst({
            where: {
                id: filteredData[i].userId
            }
        }) || { name: 'unknown', lastname: 'unknown', phone: 'unknown' , address: 'unknown'}
        const takenBy = await prisma.users.findFirst({
            where: {
                id: filteredData[i].takenById
            }
        }) || { name: 'unknown', lastname: 'unknown', phone: 'unknown' , address: 'unknown'}
        const inventory = await prisma.inventory.findFirst({
            where: {
                code: filteredData[i].inventoryId
            }
        }) || { itemId: 1, code: 'unknown' }
        const item = await prisma.items.findFirst({
            where: {
                id: inventory.itemId
            }
        }) || { name: 'unknown' }
        finalData.push({
            id: filteredData[i].id,
            name: user.name + " " + user.lastname,
            phone: user.phone,
            address: user.address,
            itemName: item.name,
            date: filteredData[i].takenAt,
            inventoryCode: inventory.code,
            takenBy: takenBy.name + " " + takenBy.lastname,
            takenByPhone: takenBy.phone,
            takenByAddress: takenBy.address,
        })
    }

    res.status(200).json(finalData)
    await prisma.$disconnect()
}

