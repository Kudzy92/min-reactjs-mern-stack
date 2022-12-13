const express=require("express");
const mongoose=require("mongoose");
const ClientModel=require("./model/Client");
const app=express();
app.use(express.json());//allows us to receive info from client as json format
//process.env.MONGO_URL,
mongoose.connect(
    "mongodb+srv://reactjscrud:IygplJZEcUjWF273@cluster0.s5puzzg.mongodb.net/mernstackcrudbinarycity?retryWrites=true&w=majority",
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        //userNewUrlParser:true,
    }
);
app.get("/", async(req,res)=>{
const client =new ClientModel({
    id:1,
    code:"KUD001",
    name:"Kudzai",
    email:"kudziemadziva@gmail.com",
    linked_no:3,
});
try{
await client.save();
res.send("Data successfully inserted!");
}catch(error){;
    console.log("Mongo Error"+error);
}
});
app.listen(3002, ()=> {
    console.log("Sever runing at port 3002");
});