import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../components/client";



export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = JSON.parse(req.body)

    const updatedData = await prisma.returns.create({
      data: {
        orderId: data.orderId,
        TakenById: data.takenByid,
        returnedAt: data.returnedAt,
      },
    })

    res.status(200).json(updatedData)
}

