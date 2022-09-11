const mongoose=require("mongoose")

const Adminschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String
})

module.exports=mongoose.model("admin",Adminschema)