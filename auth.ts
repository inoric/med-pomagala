import { NextApiRequest, NextApiResponse } from "next"
import jwt from 'jsonwebtoken'

export const checkAuth = (req: NextApiRequest, res: NextApiResponse): boolean => {
    if(req.headers.authorization && process.env.SECRET_TOKEN) {
        if(!jwt.verify(req.headers.authorization.replace("Bearer ", ""), process.env.SECRET_TOKEN)){
          res.status(401).json({})
          return false
        }
      }else{
        res.status(401).json({})
        return false;
      }

      return true;
}