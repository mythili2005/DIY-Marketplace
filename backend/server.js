var express = require('express');
var mongodb = require('mongoose');
var cors = require('cors');
var denv = require('dotenv')
var User = require('./models/users');
var app = express();
const PORT = 3001;
app.use(express.json())
app.use(cors())
denv.config()

mongodb.connect(process.env.MONGO_URI).then(() => {
    console.log("Mongodb connection successful");
}).catch(() => {
    console.log("Check your connection string");
})

app.post('/sigup',(req,res) => {
    //var {firstName,lastName,email} =  req.body
    try{
        //var newUser = new User({firstName:firstName,lastName:lastName,email:email});
        var newUser = new User(req.body);
        newUser.save()
        console.log("User added successfully")
        res.status(200).send("User added successfully");
    }
    catch(error){
        console.log(error)
    }
})

app.get('/getusers',async(req,res)=>{
    try{
        
        var allSignUpRecords = await User.find()
        res.json(allSignUpRecords);
        console.log("All data are fetched")
    }
    catch(error){
        console.log(error)
    }
})

app.delete('/deletedusers',async(req,res)=>{
    try{
        var{firstName}= req.body;
        
        var deletingUser = await User.deleteOne({firstName:firstName});
        console.log(deletingUser);
        if(deletingUser.deletedCount == 0)
        {
            res.json({message:"Enter the user correctly",isDelete:false})
        }
        else{
        res.json({message:"Deleted successfully",isDelete:true})
        }
    }
    catch(error){
        console.log(error)
    }
})

app.post('/login',async (req,res)=>{
    var{email,password}= req.body;
    try{
        var existingUser = await User.findOne({email:email});
        console.log(existingUser)
        console.log(req.body);
        if(existingUser)
        {
        if(existingUser.password !== password)
        {
            res.json({message:"Invalid credentials",isLoggedIn:false})
        }
        else{
        res.json({message:"Login successful",isLoggedIn:true})
        }
    }
    else{
        res.json({message:"User not found",isLoggedIn:false})
    }
    }
    catch(error){
        console.log(error)
    }
})

app.listen(PORT,()=>{
    console.log(`Backend server is started\nURL:http://localhost:${PORT}`)
})