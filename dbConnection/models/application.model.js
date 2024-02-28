import mongoose from "mongoose";

const schema = new mongoose.Schema({
  
    jobId:{
        type:mongoose.Types.ObjectId,
        ref: 'job'
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    },

    userTechSkills: {
        type: [String],
        trim: true
      },

      userSoftSkills: {
        type: [String],
        trim: true
      },

      userResume: {
        type: String,
        require: true
      }
},{timestamps:true})

schema.pre('save',function () {
    this.password = bcrypt.hashSync(this.password,10)
})

export const appModel = mongoose.model('app',schema)