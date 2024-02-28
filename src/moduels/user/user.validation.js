import joi from "joi";

const addUserVal = joi.object({
    firstName: joi.string().trim().min(2).required(),
    lastName: joi.string().trim().min(2).required(),
    email: joi.string().email().required(),
    password:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/).required(),
    dob: joi.date().max('now').required(),
    mobile: joi.string().pattern(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/).length(11).required(), 
    role: joi.string().valid('user', 'Company_HR')
})


const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})


const updateUserVal = joi.object({
    id: joi.string().hex().length(24).required(),
    firstName: joi.string().trim().min(2),
    lastName: joi.string().trim().min(2),
    email: joi.string().email(),
    password:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/),
    dob: joi.date().max('now'),
    mobile: joi.string().pattern(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/).length(11), 
    role: joi.string().valid('user', 'Company_HR')
})

const forgetPasswordVal = joi.object({
    id: joi.string().hex().length(24).required(),
    password:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/),
})

export {
    addUserVal,
    paramsIdVal,
    updateUserVal,
    forgetPasswordVal
}