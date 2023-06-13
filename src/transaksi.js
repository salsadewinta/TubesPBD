const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:8181/dbsbux", { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("mongodb connected")
})

.catch(()=>{
    console.log("failed not connected")
})

const TransaksiSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    jumlah:{
        type:String,
        required:true
    },
    menu:{
        type:String,
        required:true,
    },
    harga:{
        type:String,
        required:true
    }   
})


const collections = new mongoose.model("transaksi",TransaksiSchema)

module.exports= collections

