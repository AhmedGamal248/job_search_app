import express from 'express'
import { GetAllAccountsAssociatedToAspecificRecoveryEmail, deleteAccount,  forgetPassword,  getAllUserAccData,  getUserAccDataHr, signIn, signUp, updateAccount, updatePassword } from './user.controler.js'
import { checkEmailExist } from '../../middelwar/checkEmailEx.js'
import { validation } from '../../middelwar/validation.js'
import { addUserVal, forgetPasswordVal, paramsIdVal, updateUserVal } from './user.validation.js'

const userRouter = express.Router()

userRouter.post('/signUp',validation(addUserVal),checkEmailExist,signUp)
userRouter.post('/signIn',signIn)
userRouter.put('/user/:id',validation(updateUserVal),checkEmailExist,updateAccount)
userRouter.delete('/user/:id',validation(paramsIdVal),deleteAccount)
userRouter.get('/user/:id',getAllUserAccData)
userRouter.get('/userDataForHr/:id',getUserAccDataHr)
userRouter.post('/updatePassword/:id',updatePassword)
userRouter.put('/forgetPassword/:id',validation(forgetPasswordVal),forgetPassword)
userRouter.get('/GetAllAccounts',GetAllAccountsAssociatedToAspecificRecoveryEmail)

export {
    userRouter
}