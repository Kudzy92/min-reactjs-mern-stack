/*import mongoose from "mongoose"*/
const mongoose=require("mongoose");
const ClientSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        maxlength:6,
    },
    fullname:{
        type:String,
        required:true,
        maxlength:60,
    },
    email:{
        type:String,
        required:true,
        maxlength:200,
    },
    linkedcount:{
        type:Number,
        required:true,
        maxlength:10,
    },
    
},{ timestamps: true });

//export default mongoose.models.Client || mongoose.model("Clients",ClientSchema);
const clients= mongoose.models.Client || mongoose.model("clients",ClientSchema);
module.exports=clients