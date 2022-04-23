const validate=require("../util/NEValidator.js")

module.exports =(req,res,next)=>{
    let valid =validate(req.body);
    if(valid)
    {
        req.valid=1;
        next();
    }
    else{
        res.status(403).send("forbidden command")
    }
}

