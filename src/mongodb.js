const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:8181/dbsbux")
.then(()=>{
    console.log("mongodb connected")
})

.catch(()=>{
    console.log("failed not connected")
})

const LoginSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const collection = new mongoose.model("user",LoginSchema)

module.exports= collection
