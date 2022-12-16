const mongoose=require("mongoose");
const LinkedSchema = new mongoose.Schema({
    clientId:{
        type:String,
        required:true,
    },
    contactid:{
        type:String,
        required:true,
    },
    
    
},{ timestamps: true });

const links= mongoose.models.Linked || mongoose.model("linked",LinkedSchema);
module.exports=links