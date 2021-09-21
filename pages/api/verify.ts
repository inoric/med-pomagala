import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!process.env.SECRET_TOKEN) {
        throw new Error('Missing SECRET_TOKEN for signing session keys');
    }
    const token = req.body.token
    if(jwt.decode(token)!==null)
    if(jwt.verify(token, process.env.SECRET_TOKEN)){
        const data = jwt.decode(token)
        if(typeof data === "object" && data)
        if(data.date === new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))
        res.status(200).json({
            data: {
                userId: data.userId,
                date: data.date,
                token: token,
                iat: data.iat,
            },
            error: false
        }) 
    }
    res.status(401).json({
        data: null,
        error: true
    }) 
}