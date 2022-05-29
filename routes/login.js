const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const path = require('path');

// Importing a Schema
const User = require('../models/user');

router.get('/', async (req, res)=>{
    try {
        const user = await User.find({ 
            username: req.query.username,
            password: req.query.password
        });
        console.log(user);
        console.log(typeof user); //it's an object but why []?
        if (user.length != 0){
            res.redirect('/');
            console.log("Logged in successfully!!");
        } else {
            res.status(404).send("User Not Found");
            console.log("User Not Found");
        };
    } catch(err) {
        res.status(500).json({ message: err.message });
    };
});



module.exports = router;