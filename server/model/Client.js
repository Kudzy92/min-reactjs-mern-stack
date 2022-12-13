/*import mongoose from "mongoose"*/
const mongoose=require("mongoose");
const ClientSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        maxlength:6,
    },
    name:{
        type:String,
        required:true,
        maxlength:60,
    },
    email:{
        type:String,
        required:true,
        maxlength:200,
    },
    
},{ timestamps: true });

//export default mongoose.models.Client || mongoose.model("Clients",ClientSchema);
const clients= mongoose.models.Client || mongoose.model("clients",ClientSchema);
module.exports=clients