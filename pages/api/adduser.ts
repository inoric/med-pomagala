import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../components/client"


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = JSON.parse(req.body)

    const updatedData = await prisma.users.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        address: data.address,
        phone: data.phone,
        superuser: data.superuser,
        password: data.password,
        username: data.username,
      },
    })

    res.status(200).json(updatedData)

}

