import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@components/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!process.env.SECRET_TOKEN) {
        throw new Error('Missing SECRET_TOKEN for signing session keys');
    }

    // get todays date in ddmmyy format
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const response = req.body
    const data = await prisma.users.findFirst({
        where: {
            username: {
                equals: response.username
            }
        }
    });
    if (!data) {
        res.status(401).json({
            error: true,
            id: -1,
            token: "NOPE"
        })
        return;
    }
    const isValid = await bcrypt.compare(response.password, data.password || "");
    if(isValid) {
        res.status(200).json({
            error: false,
            id: data.id,
            token: jwt.sign({ userId: data.id, date: today }, process.env.SECRET_TOKEN)
        })
    }else{
        res.status(401).json({
            error: true,
            id: -1,
            token: "NOPE"
        })
    }
}

