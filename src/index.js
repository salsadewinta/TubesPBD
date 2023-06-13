const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")
const collections=require("./transaksi")
const Admin=require("./transaksi")

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

app.get("/beli",(req, res)=>{
    res.render("beli")
})

app.get("/beli_americano",(req, res)=>{
    res.render("pesan/beli_americano")
})

app.get("/beli_matcha",(req, res)=>{
    res.render("pesan/beli_matcha")
})

app.get("/beli_caramel",(req, res)=>{
    res.render("pesan/beli_caramel")
})

app.get("/beli_foam",(req, res)=>{
    res.render("pesan/beli_foam")
})

app.get("/beli_white",(req, res)=>{
    res.render("pesan/beli_white")
})

app.get("/beli_latte",(req, res)=>{
    res.render("pesan/beli_latte")
})

app.get("/beli_menu1",(req, res)=>{
    res.render("pesan/beli_menu1")
})

app.get("/tum",(req, res)=>{
    res.render("tum")
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

app.post("/beli",async (req, res)=>{

    const data={
        name:req.body.name,
        jumlah:req.body.jumlah,
        menu:req.body.menu,
        harga:req.body.harga
    }

   await collections.insertMany([data])
   res.redirect('/admin');
})

// Menampilkan data admin dalam tabel
app.get('/admin', async (req, res) => {
    try {
      const admins = await collections.find();
      res.render('admin', { admins });
    } catch (err) {
      console.error('Kesalahan:', err);
      res.sendStatus(500);
    }
  });

// Menampilkan form pengeditan data
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    collections.findById(id)
      .then(data => {
        res.render('edit', { data });
      })
      .catch(err => console.log(err));
  });

// Mengupdate data
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name, jumlah, menu, harga } = req.body;
    collections.findByIdAndUpdate(id, { name, jumlah, menu, harga })
      .then(() => {
        res.redirect('/admin');
      })
      .catch(err => console.log(err));
  });

 // Hapus data pengguna
app.get('/hapus/:id', (req, res) => {
    const id = req.params.id;
    collections.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error');
        });
});

app.listen(3000,()=>{
    console.log("port connected");
})