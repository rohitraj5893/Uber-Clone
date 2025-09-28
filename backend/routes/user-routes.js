const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {authUser} = require('../middlewares/auth-middleware');

const {registerUser,loginUser,getUserProfile,logoutUser} = require('../controllers/user-controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 character or long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character or long'),
   
],registerUser);
router.post('/login',[
     body('email').isEmail().withMessage('Invalid Email'),
     body('password').isLength({min:6}).withMessage('Password must be at least 6 character or long'),
   
],loginUser);
router.get('/profile',authUser,getUserProfile);
router.get('/logout',authUser,logoutUser);
module.exports = router;