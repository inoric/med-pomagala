import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@components/client";
import jwt from "jsonwebtoken";
import { checkAuth } from "@/auth";
interface OrderDetails {
    id: number, 
    name: string,
    phone: string, 
    address: string, 
    itemName: string, 
    date: string, 
    inventoryCode: string , 
    takenBy: string, 
    takenByAddress: string, 
    takenByPhone: string,
    returnedAt: string,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (!checkAuth(req, res)) {
        return;
      }
    let finalData: OrderDetails[] = []
    const raw = await prisma.orders.findMany({
        include: {
            Returns: true,
            user: true,
            givenBy: true,
            takenBy: true,
            inventory: {
                include: {
                    item: true,
                }
            }
        }
    });
    raw.filter(item => {
        finalData.push({
            id: item.id, 
            name: item.user.name,
            phone: item.user.phone,
            address: item.user.address,
            itemName: item.inventory.item.name,
            date: item.takenAt, 
            inventoryCode: item.inventory.code,
            takenBy: item.takenBy.name,
            takenByAddress: item.takenBy.address,
            takenByPhone: item.takenBy.phone,
            returnedAt: item.Returns ? item.Returns.returnedAt : "--/--/---",
        })
    })
    res.status(200).json(finalData)    
}

