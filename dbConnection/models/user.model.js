import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const schema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        require:true,
        minLength:[2,'too short  user name']
    },
    lastName:{
        type:String,
        trim:true,
        require:true,
        minLength:[2,'too short  user name']
    },
    email:{
        type:String,
        trim:true,
        require:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true,
    },
    dob: {
        type: Date,
        require: true
    },
    mobile: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'company_hr'],
        default: "user",
        lowercase: true
    },
    status:{
        type:String,
        enum:['online','ofline'],
        default:'ofline'
    }
},{timestamps:true})

schema.pre('save',function () {
    this.password = bcrypt.hashSync(this.password,10)
})

export const userModel = mongoose.model('user',schema)