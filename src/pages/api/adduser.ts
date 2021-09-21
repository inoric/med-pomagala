import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@components/client"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { checkAuth } from "@/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!checkAuth(req, res)) {
    return;
  }
    const data = req.body

    if(data.superuser === true)
    var password: string | null = await bcrypt.hash(data.password, 10);
    else password = null
    const updatedData = await prisma.users.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        address: data.address,
        phone: data.phone,
        superuser: data.superuser,
        password: password,
        username: data.username,
      },
    })

    res.status(200).json(updatedData)

}

