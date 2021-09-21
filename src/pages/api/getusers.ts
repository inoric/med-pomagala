import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@components/client";
import jwt from "jsonwebtoken";
import { checkAuth } from "@/auth";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!checkAuth(req, res)) {
    return;
  }
    const data = await prisma.users.findMany({
        where: {
            deleted: false
        }
    });
    res.status(200).json(data)
}

