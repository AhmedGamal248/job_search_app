import { userModel } from "../../../dbConnection/models/user.model.js"
import bcrypt from 'bcrypt'
import { catchError } from "../../middelwar/catchError.js"
import jwt from 'jsonwebtoken'
import { appError } from "../../utils/appError.js";


// 1- sign up
const signUp = catchError(async (req,res) => {
    let user = new userModel(req.body)
    let token = jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_KEY)
    await user.save()
    res.json({message:'success',token})
})


// 2- sign in
const signIn = catchError(async (req,res) => {
    const user = await userModel.findOneAndUpdate({
        $or:[
            {email:req.body.email},
            { mobile:req.body.mobile}
        ]
    },{status:'online'})
    if (user && bcrypt.compareSync(req.body.password,user.password)){
        let token = jwt.sign({userRole:user.role,userId:user._id,email:user.email},process.env.JWT_KEY)
        return res.json({message:'success',token})
    }
    res.json({message:'email or password is not true'})
})


// 3- update user
const updateAccount = catchError( async (req,res,next) => {
console.log(req.headers.token)
    const user = await userModel.findById({_id:req.params.id})
    if (user) {
        jwt.verify(req.headers.token,process.env.JWT_KEY,async(err,decoded)=>{
            if (err) return next(new appError(err,401))
            let tst = jwt.decode(req.headers.token)
            if(tst.email == user.email) {
                if ( user.status == 'online') {
                    user.set(req.body)
                    await user.save()
                    return res.json({message:'success'})
                    } else {
                        res.json({message:'somthing rong '})
                    }
            } else {
                res.json(`you are unothorized to do this`)
            }
        })
    } else {
        res.json({message:'user not found'})
    }
})


//4-delete user
const deleteAccount = catchError( async (req,res,next) => {

    const user = await userModel.findById({_id:req.params.id})
    if (user) {
        jwt.verify(req.headers.token,process.env.JWT_KEY,async(err,decoded)=>{
            if (err) return next(new appError(err,401))
            let tst = jwt.decode(req.headers.token)
            if(tst.email == user.email) {
                if ( user.status == 'online') {
                    await user.deleteOne()
                    return res.json({message:'success'})
                    } else {
                        res.json({message:'somthing rong '})
                    }
            }
            res.json(`you are unothorized to do this`)
        })
    } else {
        res.json({message:'user not found'})
    }
})

// 5- get user account data  for user
const getAllUserAccData = catchError( async (req,res,next) => {

    const user = await userModel.findById({_id:req.params.id})
    if (user) {
        jwt.verify(req.headers.token,process.env.JWT_KEY,async(err,decoded)=>{
            if (err) return next(new appError(err,401))
            let tst = jwt.decode(req.headers.token)
            if(tst.email == user.email) {
                if ( user.status == 'online') {
                    return res.json({message:'success',user})
                    } else {
                        res.json({message:'somthing rong '})
                    }
            }
            res.json(`you are unothorized to do this`)
        })
    } else {
        res.json({message:'user not found'})
    }
})

// 6- Get profile data for another user 
const getUserAccDataHr = catchError(async (req,res) => {
    const user = await userModel.findById(req.params.id)
    if (user.status == 'online') return res.json({message:'success',user})
    res.json({message:'some thing rong'})
})

// 7- Update password 
const updatePassword = async(req,res) => {
    const user = await userModel.findById(req.params.id)
    user.set(req.body)
    await user.save()
    res.json({message:'success',user})
}

// 8-Forget password 
const forgetPassword = catchError( async (req,res,next) => {

    const user = await userModel.findById({_id:req.params.id})
    if (user) {
        jwt.verify(req.headers.token,process.env.JWT_KEY,async(err,decoded)=>{
            if (err) return next(new appError(err,401))
            let tst = jwt.decode(req.headers.token)
            if(tst.email == user.email) {
                if ( user.status == 'online') {
                    user.set(req.body)
                    await user.save()
                    return res.json({message:'success',user})
                    } else {
                        res.json({message:'somthing rong '})
                    }
            } else {
                res.json(`you are unothorized to do this`)
            }
        })
    } else {
        res.json({message:'user not found'})
    }
})


// 9- Get all accounts associated to a specific recovery Email
const GetAllAccountsAssociatedToAspecificRecoveryEmail = async (req,res) => {
    const users = await userModel.find({email:req.body.email})
    users && res.json({message:'success',users})
    !users && res.json({message:'not found any thing'})
}



export {
    signUp,
    signIn,
    updateAccount,
    deleteAccount,
    getUserAccDataHr,
    getAllUserAccData,
    updatePassword,
    forgetPassword,
    GetAllAccountsAssociatedToAspecificRecoveryEmail
}