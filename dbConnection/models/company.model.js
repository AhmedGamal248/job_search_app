import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
    companyName:{
        type:String,
        uniqe:true,
        trim:true,
        require:true,
        minLength:[2,'too short  user name']
    },
    description:{
        type:String,
        trim:true,
        require:true,
        minLength:[2,'too short  user name'],
        maxLength:[1000]
    },
    industry:{
        type:String
    },
    address:{
        type:String
    },
    numberOfEmployees:{
        type:Number,
        min:11,
        max:20
    },
    email:{
        type:String,
        unique:[true,'the category name used'],
        trim:true,
        require:true,
        lowercase:true
    },
    companyHR:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    },
    
},{timestamps:true})



export const companyModel = mongoose.model('company',schema)