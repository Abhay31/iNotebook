const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Abhayisagoodb$oy';

// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/createuser',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
] , async (req, res)=>{ 
    //If there are errors, send Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    try{
        //check whether the user with this email exists already
        let user = await User.findOne({email: req.body.email});
        if(user)
        {
            return res.status(400).json({error: "Sorry a user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken})
    } catch(error){
        console.error(error.message);
        res.status(500).send("some error occured");
    }
    
} )

module.exports = router