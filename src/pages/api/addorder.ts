import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@components/client"
import jwt from "jsonwebtoken"
import { checkAuth } from "@/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!checkAuth(req, res)) {
    return;
  }
    const data = req.body

    const updatedData = await prisma.orders.create({
      data: {
        userId: data.userId,
        inventoryId: data.inventoryCode,
        takenById: data.takenById,
        givenById: data.givenById,
        takenAt: data.takenAt,
      },
    })

    res.status(200).json(updatedData)
}

