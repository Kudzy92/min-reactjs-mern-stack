const mongoose=require("mongoose");
const ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:60,
    },
    surname:{
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

/*export default mongoose.models.Contact || mongoose.model("Contact",ContactSchema);*/
const contacts= mongoose.models.Contact || mongoose.model("contacts",ContactSchema);
module.exports=contacts