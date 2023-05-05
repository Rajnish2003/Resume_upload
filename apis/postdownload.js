module.exports=(req,res)=>{
    const {file}=req.body;
    res.download(`./uploads/${file}`);
}