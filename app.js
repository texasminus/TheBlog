const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//Data Processing Middlewares
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.json()); // Need this to use req.body
// Database
mongoose.connect('mongodb+srv://nws0078:Park8785^^@apal.oi4gf.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//Static Folder 'Public'
app.use(express.static(path.join(__dirname,'public')));

// GET
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/main.html');
});

app.get('/createAccount', (req, res) => {
    res.sendFile(__dirname + '/views/createAccount.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/blog', (req, res) => {
    res.sendFile(__dirname + '/views/blog.html');
});

// Importing a router for Admin
const usersRouter = require('./routes/users');
app.use('/users', usersRouter); // middleware functions that have access to req & res


// Listening
app.listen(3000, ()=>{
    const port = process.env.PORT || 3000;
    console.log(`Listening to the port ${port}`);
});