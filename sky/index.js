require("dotenv").config()
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const bycrypt=require("bcryptjs")
var jwt = require('jsonwebtoken');
const adminModel=require("./Models/Admin")
const article=require("./Models/Article")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

const connectionparams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}


app.post("/signup",async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!(email && password && name)){
            res.status(400).send("All feilds are required")
        }
    
        const existuser= await adminModel.findOne({email})
        if(existuser){
            return res.status(401).end("User already exist")
        }
    
        const myencpassword=await bycrypt.hash(password,10)
        
        const user=await adminModel.create({
           name:name,
            email:email.toLowerCase(),
            password:myencpassword,
            role:"user"
        })
    
        // user.save()
    
        // var token = jwt.sign({ user_id:user._id, role:"admin" },process.env.SECRET,{
        //     expiresIn:"2h"
        // } );
    
        // user.token=token
        // user.password=undefined
        res.status(201).json(user)
        
     } catch (error) {
        console.log(error);
        res.end("Some Error Occured")
     }
})

app.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body

        if(!(email && password)){
           return  res.status(401).send("please enter valid credetials")
        }

        const user=await adminModel.findOne({email})
        if(!user){
            return res.send("Please Regiser First")
        }
        if(email && (await bycrypt.compare(password,user.password))){
          
            const token=jwt.sign({
                uid:user._id,
                email,
                role:user.role
            },process.env.SECRET,{
                expiresIn:'2d'
            })

            user.token=token
            user.password=undefined
            // console.log(token);
            // to access in header from fromnt end
            return res.status(201).json({token})

            
        }
        res.send("Invalid password")
    } catch (error) {
        console.log(error);
        res.end("error occured")
    }

})

// 

app.post("/article/create",async(req,res)=>{
try {
    const {title,description,longdesc, category,subCategory}= req.body
    const {authorization}=req.headers
    
    const token=authorization.split(" ")[1]

    const admindetail=jwt.verify(token,process.env.SECRET)
    console.log("jwt is ======>",admindetail);
    var today = new Date()

    const adminCompDetail=await adminModel.findOne({email:admindetail.email})
    console.log("adminCompDetail ==>",adminCompDetail);
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    var dateTime = date+' '+time;
    // console.log(dateTime);
    const articles=await article.create({
        title,
        description,
        createdAt:dateTime,
        longdesc,
        category,
        subCategory,
        adminId:adminCompDetail._id
    })
    // console.log("added data is =>",adminCompDetail);
    return res.status(201).send("Article Created Successfully")
    
} catch (error) {
    return res.status(401).send("Token not found")
}
})

app.put("/article/update",async(req,res)=>{
    const {title,description,longdesc,_id,category,subCategory}= req.body
    // db.employees.updateOne({}, {$set: {"first_name":"abcd"}})
     console.log("updateeeee");
     var today = new Date()
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    var dateTime = date+' '+time;
    await article.updateOne({_id},{
        title,
        description,
        longdesc,
        updatedAt:dateTime,
        category,
        subCategory,
        updatedAt:dateTime
    })

    return res.status(200).send("Article updated success")
})

app.delete("/articles/:_id",async(req,res)=>{
    const {_id}=req.params
    console.log(_id);
    const data=await article.deleteOne({_id})

  return res.status(200).send("Article deleted successfully")
})

app.get("/articles",async(req,res)=>{
    
try {
    const {authorization}=req.headers
   
    
    const token=authorization.split(" ")[1]

    const admindetail=jwt.verify(token,process.env.SECRET)

    // const data= await article.find({adminId:admindetail._id})
    console.log("role is", admindetail.role)
    if(admindetail.role=="admin"){

        console.log("enterr");
        const data= await article.find({})
        return res.status(200).json(data)
    }
    else{
        console.log("admin id is",admindetail);
        const data= await article.find({adminId:admindetail.uid})
        console.log(data);
        return res.status(200).json(data)
    }

   
} catch (error) {
    return res.status(401).send("token not found")
}
    // res.end()
})

app.post("/article/bycategory",async(req,res)=>{
    const {category}=req.body
    const data= await article.find({category})
    return res.status(200).json(data)
})


app.get("/",(req,res)=>{
    res.end("helloo data")
})

mongoose.connect(process.env.MONOGODB_URL,connectionparams).then(()=>{
    console.log("conneted to db");
}).catch(err=>{
    console.log(err);
})

app.listen(process.env.PORT || 3000,(req,res)=>{
   
    console.log("server started successfully")
})