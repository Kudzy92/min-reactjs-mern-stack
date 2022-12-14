const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const ClientModel=require("./model/Client");
const ContactModel=require("./model/Contact");
const { default: Contact } = require("./model/Contact");
const bodyParser = require("body-parser")


const app=express();
app.use(express.json());//allows us to receive info from client as json format
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//process.env.MONGO_URL,
//cors allows to call our APIs
mongoose.connect(
    "mongodb+srv://reactjscrud:IygplJZEcUjWF273@cluster0.s5puzzg.mongodb.net/mernstackcrudbinarycity?retryWrites=true&w=majority",
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        //userNewUrlParser:true,
    }
);
app.post("/insert", async(req,res)=>{
    const code=req.body.code,
   fullname=req.body.fullname,
  email=req.body.email,
     linkedcount=req.body.linkedcount;
    console.log("BACKEND DATA"+"CoDE"+code+"FullANme"+fullname+"EMAIL"+email+"LINKED"+linkedcount)
const client =new ClientModel({
    code:code,
    fullname:fullname,
    email:email,
    linkedcount:linkedcount,
});
try{
await client.save();
res.send("Client Data successfully inserted!");
}catch(error){
    console.log("Mongo Error"+error);
    /* console.log("Mongo Error"+error.response.status);
    console.log("Mongo Error"+error.response.data);
    console.log("Mongo Error"+error.response.headers);*/
}
});
app.post("/insertcontact", async(req,res)=>{
    const name=req.body.name,
   surname=req.body.surname,
    email=req.body.email,
    linked=req.body.linkedcount;
    console.log("BACKEND DATA CONTACT"+"Name"+name+"SURNAME"+surname+"EMAIL"+email);
const contact =new ContactModel({
    name:name,
    surname:surname,
    email:email,
    linkedcount:linked,
});
try{
await contact.save();
res.send("Contact Data successfully inserted!");
}catch(error){
    console.log("Mongo Error"+error);
}
});
/*app.get("/", async(req,res)=>{
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
    });*/
    app.get("/read", async(req,res)=>{
        //ClientModel.find({$where:{email: 'kudziemadziva@gmail.com'}},);
        ClientModel.find({},(err,result)=>{
        if(err){
            res.send(err);//id there is error send(err) will terminate and send an error
        }
        res.send(result);
        })
        });
        app.get("/readclientby", async(req,res)=>{
            const id=req.body._id;
            ClientModel.find({$where:{_id:id}},(err,result)=>{
            if(err){
                res.send(err);
            }
            res.send(result);
            })
            });
        app.get("/readcontact", async(req,res)=>{
            ContactModel.find({},(err,result)=>{
            if(err){
                res.send(err);
            }
            res.send(result);
            })
            });
        app.put("/update", async(req,res)=>{
            const client =req.body.newFoodname;
            const id =req.body.id;
            try{
            await ClientModel.findById(id,(err,updatedFood)=>{
                updatedFood.foodname=newFoodname;
                updatedFood.save();
                res.send("Data sucessfully sent")
            });
           
            }catch(error){
                console.log("Mongo Error"+error);
            }
            });
            app.delete("/delete/id", async(req,res)=>{
                
                try{
                await client.save();
                res.send("Data successfully inserted!");
                }catch(error){
                    console.log("Mongo Error"+error);
                }
                });
app.listen(3001, ()=> {
    console.log("Sever runing at port 3001");
});