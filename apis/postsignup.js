
const Collection = require('./mongoSchema');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

module.exports=async(req,res)=>{
     const error = [];
    const { name, email, password, cpassword,address,stacks} = req.body;
    console.log(req.files);
    console.log(req.body);
    if (!name || !email || !password || !cpassword||!req.files) {
        error.push("All fields are mandotory!");
    } else if (password != cpassword) {
        error.push("Password didn't match");
    } else if (password.length < 6) {
        error.push("Password must be greater than 6 charaters");
    } else {
        const user = await Collection.findOne({ email });
        if (user) error.push("Email already register!");
    }
    if (error.length > 0) 
        res.send(error[0]);
     else {
        const hashedPassword = await bcrypt.genSalt(10).then(salt=>{
            return bcrypt.hash(password,salt);
        })
        var file=req.files.file;
        var filename=file.name;
        file.mv('./uploads/'+filename,function(err){
            if(err){
               console.log(err);
            }else{
                console.log("file uploaded");
            }
        })
        const newUser = await Collection.create({
            name,
            email,
            password: hashedPassword,
            address,
            stacks,
            file: filename
        })
        res.redirect('/login');
    }
}