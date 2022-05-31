const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const path = require('path');
const date = new Date();

// Importing a Schema
const User = require('../models/user');

router.post('/', async (req, res)=>{
    try {
        const user = await User.find({ 
            username: req.body.username,
            password: req.body.password
        });
        console.log("Login Try "+date.toLocaleTimeString());
        console.log(user);
        if (user.length != 0){
            res.redirect('/loggedin');
            console.log("Logged in successfully!!");
        } else {
            res.redirect('/404')
            console.log("User Not Found");
        };
    } catch(err) {
        res.status(500).json({ message: err.message });
    };
});



module.exports = router;