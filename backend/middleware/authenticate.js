const ErrorHanlder = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
exports.isAunthenticatedUser = catchAsyncError(async(req,res,next)=>{
 const {token} = req.cookies;
 
 if(!token){
    return next(new ErrorHanlder('Login first to handled to this resource',401))
 }

 const decoded = jwt.verify(token,process.env.JWT_SECRET)
  req.user = await User.findById(decoded.id)
  next();
})

exports.authorizeRoles = (...roles) =>{
   return(req,res,next) => {
if(!roles.includes(req.user.role)){
   return next(new ErrorHanlder(`role ${req.user.role} is not defined`,401))
}
next()
   }
}