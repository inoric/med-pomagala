import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@components/client"
import jwt from "jsonwebtoken"
import { checkAuth } from "@/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (!checkAuth(req, res)) {
        return;
      }
    let fullInventory: 
    {
        id: number,
        name: string;
        items: 
        {  
            available: boolean;
            code: string;
        }[]
    }[] = []
    
    const TheBigCall = await prisma.items.findMany({
        include: {
            Inventory: {
                include: {
                    Orders: {
                        include: {
                            Returns: true
                        },
                        orderBy: {
                            id: "desc"
                        }
                    }
                },
                orderBy: {
                    code: "asc"
                },
                where: {
                    deleted: false
                }
            }
        }
    })
    
    TheBigCall.forEach(item => {
        let itemInventory: {available: boolean, code: string}[] = []
        item.Inventory.forEach(inventory => {
            if (inventory.Orders.length === 0) {
                itemInventory.push({available: true, code: inventory.code})
            } else {
                if (inventory.Orders[0].Returns === null) {
                    itemInventory.push({available: false, code: inventory.code})
                }else{
                    itemInventory.push({available: true, code: inventory.code})
                }
                
            }
        })
        fullInventory.push({id: item.id, name: item.name, items: itemInventory})
    })

    res.status(200).json({fullInventory})
}

