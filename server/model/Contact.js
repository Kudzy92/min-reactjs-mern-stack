import mongoose from "mongoose"
const ContactSchema = new mangoose.Schema({
    name:{
        name:String,
        required:true,
        maxlength:60,
    },
    surname:{
        surname:String,
        required:true,
        maxlength:60,
    },
    email:{
        email:String,
        required:true,
        maxlength:200,
    },
    
},{ timestamps: true });

export default mongoose.models.Contact || mongoose.model("Contact",ContactSchema);