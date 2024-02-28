import { appModel } from "../../../dbConnection/models/application.model.js"
import { jobModel } from "../../../dbConnection/models/job.model.js"
import { catchError } from "../../middelwar/catchError.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"

// 1- add job
const addJob = async (req,res)=> {
    const doc = await jobModel.insertMany(req.body)
    res.json({message:'success',doc})
}

// 2- update job 
const updateJob = catchError(async (req,res)=> {
    const doc = await jobModel.findById(req.params.id)
    doc.set(req.body)
    await doc.save()
    res.json({message:'success',doc})
})

// 3- delete job
const deleteJob = catchError(async (req,res)=> {
    const doc = await jobModel.findByIdAndDelete(req.params.id)
    res.json({message:'success',doc})
})




// 4- get all job
const getAllJob = async (req,res)=> {
    const doc = await jobModel.find()
    res.json({message:'success',doc})
}

// 5- Get all Jobs for a specific company.
const getAllJobForSpecificCompany = async (req,res)=> {
    const doc = await jobModel.find({addedBy:req.params.id})
    res.json({message:'success',doc})
}

// 6- Get all Jobs that match the following filters 

const getAllJobFilters = async (req,res)=> {
    let apiFeatures = new ApiFeatures(jobModel.find(),req.query)
    .sort().fields().filteration().pagination().search()
 
     let doc = await apiFeatures.mongooseQuery;
     res.json({ massage: "successs",page:apiFeatures.pageNum,next_page:apiFeatures.nexP, doc });

}


// 7- Apply to Job
const ApplyForJob = catchError(async (req,res)=> {
    let doc = await appModel.insertMany(req.body)
    res.json({message:'success', doc})
})

export {
    addJob,
    deleteJob,
    updateJob,
    getAllJob,
    getAllJobForSpecificCompany,
    getAllJobFilters,
    ApplyForJob
}