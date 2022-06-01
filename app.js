const date = new Date();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

const mongoURI = 'mongodb+srv://nws0078:Park8785^^@apal.oi4gf.mongodb.net/?retryWrites=true&w=majority';



// //Data Processing Middlewares
app.use(express.urlencoded({extended: false}));

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

// -----------------Database-----------------
mongoose.connect('mongodb+srv://nws0078:Park8785^^@apal.oi4gf.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database\n'));


// -----------------Session-----------------
const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'mySessions'
});

app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    store: store
  }));

//Middleware to prevent accessing a page that needs auth.
const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        next();
    } else {
        res.redirect('/');
    };
};


//--------Static Folder 'public'--------
app.use(express.static(path.join(__dirname,'public')));

// -----------------GET-----------------
// Home
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/main.html');
});

// Login 
app.get('/loggedin', isAuth,(req, res) => {
    res.sendFile(__dirname + '/views/loggedin.html');
});

// Register
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});
// 404 Error
app.get('/404', (req, res) => {
    res.sendFile(__dirname + '/views/404.html');
});

// About
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

// Blog
app.get('/blog', (req, res) => {
    res.sendFile(__dirname + '/views/blog.html');
});

// Logout
app.post('/logout', (req, res) => {
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/');
    });
});


// ----------------Middlewares---------------- 
// All requests to API begin with /register 
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const connectMongodbSession = require('connect-mongodb-session');

// The app.use("/register", router) call means all valid URLs must start with the path /register
app.use('/register', registerRouter); // middleware functions that have access to req & res
app.use('/login', loginRouter);

// -----------------Listening-----------------
app.listen(3000, ()=>{
    const port = process.env.PORT || 3000;
    console.log(`Listening to the port ${port}`);
    console.log(date.toLocaleTimeString());
});