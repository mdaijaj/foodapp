const jwt= require('jsonwebtoken');


//login token authrization
exports.login_required= (req, res, next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(" ")[1]
        console.log("token", token)
        const user= jwt.verify(token, "aijajkhan");
        req.user=user;
        // console.log(user)
    }else{
        res.status(403).send("authrization requied")
    }
    next();
}