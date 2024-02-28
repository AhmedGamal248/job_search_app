import { appError } from "../utils/appError.js"
import { catchError } from "./catchError.js"
import jwt from 'jsonwebtoken'

export const allawedTo = (...roles) => {
    return (req,res,next) => {
        jwt.verify(req.headers.token,'process.env.JWT_KEY',async(err,decoded)=>{
            if (err) return next(new appError(err,401))
            }) 
            let tst = jwt.decode(req.headers.token) 
        if(!roles.includes(tst.role)) 
        return next(new appError('you are not authorized',401))
    next()
    }
}
