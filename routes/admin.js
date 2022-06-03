const express =require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { route } = require('express/lib/application');
const router = express.Router();
const bcrypt = require('bcryptjs');
const path = require('path');
const date = new Date();
const app = express();

app.use(cookieParser());

// Importing a Schema
const User = require('../models/user');

//----------------Login----------------
router.post('/', async (req, res)=>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log("Login Try "+date.toLocaleTimeString());
        
        if(!user) {
            console.log("User Not Found\n");
            return res.redirect('/404');
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            console.log("Password is incorrect\n");
            return res.redirect('/');
        };

        req.session.isAuth = true;
        req.session.username = username;
        console.log('Logged in successfully!')
        res.redirect('/loggedin');
        
    } catch(err) {
        res.status(500).json({ message: err.message });
    };
});

//----------------Logout----------------
router.post('/logout', (req, res) => {
    req.session.destroy((err)=>{
        if(err) throw err;
        console.log('Logged out')
        res.redirect('/');
    });
});


//----------------Register----------------
// Register (GET)
router.get('/register', (req, res)=>{
    res.sendFile(path.dirname(__dirname)+'/views/register.html');
});

// Register (POST)
router.post('/register', async (req, res)=>{
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