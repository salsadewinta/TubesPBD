const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")

app.use(express.static(path.join(__dirname, '../public')));

const templatesPath=path.join(__dirname, '../templates')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatesPath)
app.use(express.urlencoded({extended:false}))

app.get("/login",(req, res)=>{
    res.render("login")
})

app.get("/",(req, res)=>{
    res.render("home")
})

app.get("/register",(req, res)=>{
    res.render("register")
})

app.get("/menu",(req, res)=>{
    res.render("menu")
})

app.get("/logout",(req, res)=>{
    res.render("home")
})

app.post("/register",async (req, res)=>{

    const data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }

   await collection.insertMany([data])
   res.render("login")

})

app.post("/login",async (req, res)=>{

    

   try{
    const check= await collection.findOne({email:req.body.email})

    if(check.password===req.body.password){
        res.render("menu")
    }
    else{
        res.send("Pasword Salah")
    }
        res.render("menu")
   }
   catch{
    res.send("wrong details")
   }

})

app.listen(3000,()=>{
    console.log("port connected");
})