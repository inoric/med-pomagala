import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

/**
 * Get the current date as `MMM DD, YYYY`
 */
function getShortDate(): string {
    const now = new Date();

    return now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!process.env.SECRET_TOKEN) {
        throw new Error('Missing SECRET_TOKEN for signing session keys');
    }
    const token = req.body.token;
    const tokenData = jwt.decode(token);
    if (!tokenData || typeof tokenData !== 'object') {
        res.status(400).json({
            data: null,
            error: 'Invalid token',
        });
        return;
    }

    const isValid = jwt.verify(token, process.env.SECRET_TOKEN);
    const isNotExpired = tokenData.date === getShortDate();

    if (isValid && isNotExpired) {
        res.status(200).json({
            data: {
                userId: tokenData.userId,
                date: tokenData.date,
                token: token,
                iat: tokenData.iat,
            },
            error: false
        });
    } else {
        res.status(401).json({
            data: null,
            error: true
        });
    }
}