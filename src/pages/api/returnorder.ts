import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@components/client";
import jwt from "jsonwebtoken";
import { checkAuth } from "@/auth";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!checkAuth(req, res)) {
      return;
    }
    const data = req.body

    const updatedData = await prisma.returns.create({
      data: {
        orderId: data.orderId,
        TakenById: data.takenByid,
        returnedAt: data.returnedAt,
      },
    })

    res.status(200).json(updatedData)
}

