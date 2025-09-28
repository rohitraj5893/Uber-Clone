const userModel = require('../models/user-model');
const blackListTokenModel = require('../models/blacklist-token-model');
const userService = require('../services/user-service');
const { validationResult } = require('express-validator')


exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({email});
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email: email,
        password: hashPassword,
    });

    const token = user.generateAuthToken();
    res.cookie('token', token);
    return res.status(201).json({ token, user });
}

exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }


    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = await user.generateAuthToken();
    res.cookie('token', token);
    return res.status(200).json({ token, user });
}

exports.getUserProfile = async (req, res, next) => {
    console.log("heillow fwohfo")
    return res.status(200).json(req.user);
}

exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blackListTokenModel.create({ token });

    return res.status(200).json({ message: 'Logged out' });
}