const mongoose=require('mongoose');
const mongooseConnect=()=>{
    mongoose.connect(process.env.MONGO_URI,{
    }) .then(() => console.log("Connect to Database"))
    .catch(() =>console.log("ERROR "));    
}
module.exports=mongooseConnect;