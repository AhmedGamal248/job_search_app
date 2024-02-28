import { userModel } from "../../dbConnection/models/user.model.js"

export const checkEmailExist = async (req,res,next) => {
    const user = await userModel.findOne({$or: [
        {email:req.body.email},
        {mobile:req.body.mobile}
    ]})
    if(user) return res.json({message:'email is already exist'})
    next()
}