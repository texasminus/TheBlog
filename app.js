const date = new Date();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// //Data Processing Middlewares
app.use(express.urlencoded({extended: false}));

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

// Database
mongoose.connect('mongodb+srv://nws0078:Park8785^^@apal.oi4gf.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//Static Folder 'public'
app.use(express.static(path.join(__dirname,'public')));

// GET
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/main.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/blog', (req, res) => {
    res.sendFile(__dirname + '/views/blog.html');
});

// Importing a router for Admin
// All requests to API begin with /users
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

// The app.use("/users", router) call means all valid URLs must start with the path /users
app.use('/users', usersRouter); // middleware functions that have access to req & res
app.use('/login', loginRouter);

// Listening
app.listen(3000, ()=>{
    const port = process.env.PORT || 3000;
    console.log(`Listening to the port ${port}`);
    console.log(date.toLocaleTimeString());
});