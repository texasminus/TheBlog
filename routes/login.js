const express =require('express');
const session = require('express-session');
const { route } = require('express/lib/application');
const router = express.Router();
const bcrypt = require('bcryptjs');
const path = require('path');
const date = new Date();

// Importing a Schema
const User = require('../models/user');

//-------------Login-------------
router.post('/', async (req, res)=>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log("\nLogin Try "+date.toLocaleTimeString());
        
        if(!user) {
            console.log("User Not Found\n");
            return res.redirect('/');
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            console.log("Password is incorrect\n");
            return res.redirect('/');
        };

        req.session.isAuth = true;
        res.redirect('/loggedin');
        
    } catch(err) {
        res.status(500).json({ message: err.message });
    };
});





module.exports = router;