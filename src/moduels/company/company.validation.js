import joi from 'joi'

const addCompanyVal = joi.object({
    companyName: joi.string().length(100).trim().required(),
    description: joi.string().trim().min(2).max(10000).required(),
    industry: joi.string().trim(),
    address: joi.string().trim(),
    numberOfEmployees: joi.number().min(11).max(20).required(),
    email: joi.string().email().required(),
    companyHR: joi.string().hex().length(24).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})

const updateCompanyVal = joi.object({
    id: joi.string().hex().length(24),
    companyName: joi.string().length(100).trim(),
    description: joi.string().trim().min(2).max(10000),
    industry: joi.string().trim(),
    address: joi.string().trim(),
    numberOfEmployees: joi.number().min(11).max(20),
    email: joi.string().email(),
    companyHR: joi.string().hex().length(24)
})

export {
    addCompanyVal,
    paramsIdVal,
    updateCompanyVal
}