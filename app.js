const express=require("express")
var cookieParser = require('cookie-parser')
const mongoose=require("mongoose")
const app=express()
const ejs=require("ejs")
const bodyparser=require("body-parser")
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect("mongodb://127.0.0.1:27017/Windy", { useNewUrlParser: true },{
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).catch((err) => {
    console.log("Error connecting to database", err);

});
const registrationschema={
    name:String,email:String,password:String,phonenumber:Number,location:String
}
const db=mongoose.model("db",registrationschema)
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/',(req,res)=>{
    // res.send('weather website')
    res.render('registration')
 })
 app.get('/home',(req,res)=>{
    // res.send('weather website')
    res.render('home')
 })
 app.post('/store',async(req,res)=>{
    // res.send('weather website')
    //res.render('home')
    //console.log(req.body)
    let data=req.body
    const savedata=new db({

        ...data
    })
    const savedb = await savedata.save()
   if(savedb){
    res.redirect("/login")
   }
 })
 app.post('/loginstore',async(req,res)=>{
    // res.send('weather website')
    //res.render('contact')
    let name=req.body.username
 let password=req.body.password
 const check=await db.findOne({
    name:name
 })
 console.log (check)
 res.cookie('username', check.name) // options is optional
if(check){
    if(check.password==password){
        res.redirect("/home")
    }
    else{
        res.redirect("/login")
    }
}
else{
    res.redirect("/login")
}
 })
 app.post('/deletacc',async(req,res)=>{
    // res.send('weather website')
    //res.render('contact')
    let passworddb=req.body.password
    const deleteacc=await db.findOneAndDelete({
        password:passworddb
    })
    if(deleteacc){
        res.redirect("/")
    }
 })
 app.post('/userupdate',async(req,res)=>{
    // res.send('weather website')
    let userup= await db.findOneAndUpdate({
        name:req.body.username
    },{
        $set:{
            password:req.body.password
        }
    }
)
if (userup){
    res.redirect("/login")
}
})
 
 app.get('/update',(req,res)=>{
    // res.send('weather website')
    res.render('update')
 })

app.get('/contact',(req,res)=>{
    // res.send('weather website')
    res.render('contact')
 })
 app.get('/deletion', async (req,res)=>{
    console.log(req.cookies) 

    // res.send('weather website')
    let name=req.cookies?.username;
    const user=await db.findOne({
       name:name
    })
    console.log(user);
    res.render('deletion', { username: name })    
 })
 app.get('/login',(req,res)=>{
    // res.send('weather website')
    res.render('login')
 })
 app.get('/message',(req,res)=>{
    // res.send('weather website')
    res.render('message')
 })
 app.get('/registration',(req,res)=>{
    // res.send('weather website')
    res.render('registration')
 })
app.listen('3000', (req,res)=>{
    console.log("server started")
})

app.post("/store", async (req, res) => {
    let data = req.body;
    const saveData = new db({
      ...data,
    });
    const savedDb = await saveData.save();
    if (savedDb) {
    
      res.render("user-name", { username: data.name });
    }
  });
