import express from 'express'
import { ApplyForJob, addJob, deleteJob, getAllJob, getAllJobFilters, getAllJobForSpecificCompany, updateJob } from './job.controler.js'
import { allawedTo } from '../../middelwar/authorise.js'

const jobRouter = express.Router()

jobRouter.post('/job',allawedTo('company_hr'),addJob)
jobRouter.put('/job/:id',allawedTo('company_hr'),updateJob)
jobRouter.delete('/job/:id',allawedTo('company_hr'),deleteJob)
jobRouter.get('/job',allawedTo('user','company_hr'),getAllJob)
jobRouter.get('/job/:id',allawedTo('user','company_hr'),getAllJobForSpecificCompany)
jobRouter.get('/jobF',getAllJobFilters)
jobRouter.post('/applyForJob',allawedTo('user'),ApplyForJob)

export {
    jobRouter
}