import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../components/client"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = JSON.parse(req.body)

  const user = await prisma.users.update({
      where: { id: Number(data.id) },
      data: { 
          deleted: true
       }
  })
  res.status(200).json(user)
}

