import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@components/client"
import jwt from "jsonwebtoken"
import { checkAuth } from "@/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!checkAuth(req, res)) {
    return;
  }
  const data = req.body

  const user = await prisma.users.update({
      where: { id: Number(data.id) },
      data: { 
          deleted: true
       }
  })
  res.status(200).json(user)
}
