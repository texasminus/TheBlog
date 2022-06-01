const express = require('express');
const session = require('express-session');
const { route } = require('express/lib/application');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Importing a Schema
const User = require('../models/user');

//-----------------Creating Routes-----------------
// Register (POST)
router.post('/', async (req, res)=>{
    const { username, password } = req.body;

    userCheck = await User.findOne({username});

    if(userCheck) {
        console.log("Your username is being used!")
        return res.redirect('/register');
    };

    const hashedPsw = await bcrypt.hash(password, 12); // 2nd param: salt

    const user = new User({
        username,
        password: hashedPsw
    });
    
    try {
        console.log("\nCreated User Account");
        console.log("username: "+req.body.username);
        console.log("password: "+req.body.password+"\n");
        const newUser = await user.save();
        res.redirect('/');
    } catch(err){
        res.status(400).json({ message: err.message })
    };
});

module.exports = router;