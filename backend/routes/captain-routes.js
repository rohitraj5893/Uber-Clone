const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {registerCaptain} = require('../controllers/captain-controller');


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 character or long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 character or long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 character or long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 character or long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1 or long'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be car, motorcycle or auto'),
],registerCaptain);



module.exports = router;