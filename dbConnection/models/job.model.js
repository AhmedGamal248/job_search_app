import mongoose from "mongoose";

const schema = new mongoose.Schema({
    jobTitle:{
        type:String,
        require:true,
        trim:true
    },
    jobLocation:{
        type:String,
        enum:['onsite', 'remotely', 'hybrid'],
        require:true,
        trim:true
    },
    workingTime:{
        type:String,
        enum:['part-time' , 'full-time'],
        require:true,
        trim:true
    },
    seniorityLevel:{
        type:String,
        enum:['Junior' , 'Mid-Level','Senior','Team-Lead','CTO'],
        require:true,
        trim:true
    },
    jobDescription:{
        type:String,
        trim:true,
        require:true,
        minLength:[2,'too short   job description'],
        maxLength:[1000]
    },
    technicalSkills:{
        type:[String],
        trim:true
    },
    softSkills:{
        type:[String],
        trim:true
    },
    addedBy:{
        type:mongoose.Types.ObjectId,
        ref:'company',
        require:true
    }
})


schema.pre('find',function(){
    this.populate('addedBy')
})

export const jobModel = mongoose.model('job',schema)