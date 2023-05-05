const Collection = require('./mongoSchema');
const bcrypt = require('bcrypt');

module.exports=async (req,res)=>{
    const { email, password } = req.body;
    const error = [];
    const user = await Collection.findOne({ email });
    if(!user){
        res.redirect('/login');
        return
    }
    const validPass=await bcrypt.compare(password,user.password);
    if(validPass){ 
     req.session.user_id=user.email;   
     res.redirect('/');
    }else
     res.redirect('/login'); 
}