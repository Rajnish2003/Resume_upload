const express=require('express');
const bodyParser = require('body-parser')
const upload=require('express-fileupload');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const port = process.env.PORT || 2000
const path=require('path');
const app=express();
require('dotenv').config();
app.use(express.urlencoded());
app.use(express.json());
app.use(upload());
app.use(cookieParser());
app.use(session({secret: 'secret'}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const gethome=require('./apis/gethome')
const getlogin = require('./apis/getlogin');
const postsignup = require('./apis/postsignup');
const getsignup = require('./apis/getsignup')
const postlogin=require("./apis/postlogin");
const getlogout=require("./apis/getlogout")
const postdownload=require('./apis/postdownload');

const requireLogin=(req,res,next)=>{
    if(!req.session.user_id){
        return res.redirect('/login');
    }
    next();
}
//Mongoose
const mongooseConnect=require('./apis/mongooseConnect');
mongooseConnect();

//Routes
app.get('/',requireLogin,(req,res)=>{gethome(req,res)});
app.get("/signup",(req,res)=>{getsignup(req,res)});
app.post("/signup",(req,res)=>{postsignup(req,res)});
app.get("/login",(req,res)=>{getlogin(req,res);})
app.post("/login",(req,res)=>{postlogin(req,res)});
app.post('/download',(req,res)=>{postdownload(req,res)});
app.get("/logout", (req, res) =>{getlogout(req,res)});
app.listen(port,()=>{console.log("Listening");})