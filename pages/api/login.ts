import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../components/client";



export default async (req: NextApiRequest, res: NextApiResponse) => {
    const response = JSON.parse(req.body)
    const data = await prisma.users.findFirst({
        where: {
            username: {
                equals: response.username
            },
            password: {
                equals: response.password
            }
        }
    }) || {id: -1};
    res.status(data.id===-1?401:200).json({
        error: data.id===-1?true:false,
        id: data.id
    })
}