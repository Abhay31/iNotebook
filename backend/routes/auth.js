const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');


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
    //check whether the user with this email exists already 
    try{
        let user = await User.findOne({email: req.body.email});
        if(user)
        {
            return res.status(400).json({error: "Sorry a user with this email already exists"})
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({user})
    } catch(error){
        console.error(error.message);
        res.status(500).send("some error occured");
    }
    
} )

module.exports = router