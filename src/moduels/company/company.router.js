import  express  from "express";
import { addCompany, deleteCompany, getAllCompanys, getCompanyData, updateCompany } from "./company.controler.js";
import { allawedTo } from "../../middelwar/authorise.js";

const companyRouter = express.Router()

companyRouter.post('/company',allawedTo('company_hr'),addCompany)
companyRouter.put('/company/:id',allawedTo('company_hr'),updateCompany)
companyRouter.delete('/company/:id',deleteCompany)
companyRouter.get('/company/:id',getCompanyData)
companyRouter.get('/company',allawedTo('company_hr','user'),getAllCompanys)

export {
    companyRouter
}