const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();



// Importing a Schema
const User = require('../models/user');

//Creating Routes
//GET all users
router.get('/', async (req, res)=>{
    try {
        const users = await User.find(); // Getting all users
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    };
});

//GET one user
router.get('/:id', getUser, async (req, res)=>{
    res.json(res.user);
});

// POST (Create)
router.post('/', async (req, res)=>{
    console.log("Created User Account");
    console.log("username: "+req.body.username);
    console.log("password: "+req.body.password);
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch(err){
        res.status(400).json({ message: err.message })
    };
});
//Update
router.patch('/:id', getUser, async (req, res)=>{
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
    
});

// Delete
router.delete('/:id', getUser, async (req, res)=>{
    try {
        await res.user.remove();
        res.json({message: "Deleted User"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

//Middleware Function for user
async function getUser(req, res, next){
    let user
    try {
        user = await User.findById(req.params.id);
        if (!user){
            return res.status(404).json({message:"User Not Found"})
        };
    } catch(err) {
        return res.status(500).json({ message: err.message });
    };
    res.user = user;
    next();
};


module.exports = router;