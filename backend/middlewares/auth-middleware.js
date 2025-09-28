require('dotenv').config();
const userModel = require('../models/user-model');
const blackListTokenModel = require('../models/blacklist-token-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.authUser = async (req,res,next) => {
   
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'Unauthorized Access'})
    }
     
    const isBlackListed = await blackListTokenModel.findOne({token : token});
    if(isBlackListed){
        return res.status(401).json({message:'Unauthorized Access'})
    }

    try{
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const user = await userModel.findById(decoded._id);

       req.user = user;

       return next();
    }
    catch(err){
       return res.status(401).json({message:'Unauthorized Access'})
    }
    
}