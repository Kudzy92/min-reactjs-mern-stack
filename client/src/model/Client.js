import mongoose from "mongoose"
const ClientSchema = new mangoose.Schema({
    code:{
        code:String,
        required:true,
        maxlength:6,
    },
    name:{
        name:String,
        required:true,
        maxlength:60,
    },
    email:{
        email:String,
        required:true,
        maxlength:200,
    },
    
},{ timestamps: true });

export default mongoose.models.Client || mongoose.model("Client",ClientSchema);