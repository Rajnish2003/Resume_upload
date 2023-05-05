const Collection = require('./mongoSchema');

module.exports=async (req,res)=>{
    var user = await Collection.find({ file:{$ne:null} });
    res.render('home',{user});
}