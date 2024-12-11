
module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    if(process.env.NODE_ENV == 'development'){
    res.status(err.statusCode).json({
        success:false,
        error:err,
        message:err.message,
        stack:err.stack
        
    })
}
else if(process.env.NODE_ENV == 'Production'){
    let message = err.message;
    let error = new Error(message);
if(err.name == "ValidationError"){
    message = Object.values(err.errors).map(value => value.message)
error = new Error(message,400);
err.statusCode = 400
}
if(err.name == 'CastError'){
    message = `Resource not Found : ${err.path}`,
    error = new Error(message);
    err.statusCode = 400

}
if(err.code == 11000){
    let message = `duplicate ${Object.keys(err.keyValue)} error`
    error = new Error(message)
    err.statusCode = 400

}
if(err.name == 'JSONWebTokenError'){
    let message = `JSONWebToken is invalid. Try again`;
    error = new Error(message)
    err.statusCode = 400

}
if(err.name == 'TokenExpiredError'){
    let message = `TokenExpiredError is invalid. Try again`;
    error = new Error(message)
    err.statusCode = 400

}
    res.status(err.statusCode).json({
        success:false,
        message:error.message || 'Internal Server Error'
      
    })
}

}