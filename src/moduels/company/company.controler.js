import { companyModel } from "../../../dbConnection/models/company.model.js"
import { catchError } from "../../middelwar/catchError.js"
import jwt from 'jsonwebtoken'
import { ApiFeatures } from "../../utils/apiFeatures.js"

//1- add company
const addCompany = catchError(async (req,res)=> {
    
    const doc = await companyModel.insertMany(req.body)
    res.json({message:'success',doc})
})


//2- Update company
const updateCompany = catchError(async (req,res) => {
    const doc = await companyModel.findById(req.params.id)
    jwt.verify(req.headers.token,'process.env.JWT_KEY',async(err,decoded)=>{
        if (err) return next(new appError(err,401))})
        let tst = jwt.decode(req.headers.token)
       
        if(tst.userId == doc.companyHR) {
            doc.set(req.body)
            await doc.save()
            res.json({message:'success',doc})
        } else {
            res.json({message:'some thing rong'})
        }
    
})


//3- delete company
const deleteCompany = catchError(async (req,res) => {
    const doc = await companyModel.findById(req.params.id)
    jwt.verify(req.headers.token,'process.env.JWT_KEY',async(err,decoded)=>{
        if (err) return next(new appError(err,401))})
        let tst = jwt.decode(req.headers.token)
       
        if(tst.userId == doc.companyHR) {
            await doc.deleteOne()
            res.json({message:'success',doc})
        } else {
            res.json({message:'some thing rong'})
        }
    
})


//4- get company data
const getCompanyData = async (req,res)=> {
    const doc = await companyModel.find()
    res.json({message:'success',doc})
}

// 5- get All companys and search
const getAllCompanys = catchError(async (req,res) => {
    let apiFeatures = new ApiFeatures(companyModel.find(),req.query)
    .sort().fields().filteration().pagination().search()
 
     let doc = await apiFeatures.mongooseQuery;
     res.json({ massage: "successs",page:apiFeatures.pageNum,next_page:apiFeatures.nexP, doc });
   
})

export {
    addCompany,
    updateCompany,
    deleteCompany,
    getCompanyData,
    getAllCompanys
}