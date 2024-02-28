import joi from 'joi'

const addJobVal = joi.object({
    jobTitle: joi.string().length(100).trim().required(),
    jobLocation: joi.string().trim().required(),
    workingTime: joi.string().trim().required(),
    seniorityLevel: joi.string().trim().required(),
    jobDescription: joi.string().trim().min(2).max(10000).required(),
    technicalSkills: joi.string().trim(),
    softSkills: joi.string().trim(),
    addedBy: joi.string().hex().length(24).required()
})

const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})

const updateJobVal = joi.object({
    jobTitle: joi.string().length(100).trim().required(),
    jobLocation: joi.string().trim().required(),
    workingTime: joi.string().trim().required(),
    seniorityLevel: joi.string().trim().required(),
    jobDescription: joi.string().trim().min(2).max(10000).required(),
    technicalSkills: joi.string().trim(),
    softSkills: joi.string().trim(),
    addedBy: joi.string().hex().length(24).required()
})

export {
    addJobVal,
    paramsIdVal,
    updateJobVal
}