const dotenv = require('dotenv').config();
const date = new Date();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const connectMongodbSession = require('connect-mongodb-session');

const Article = require('./models/article');

const adminRouter = require('./routes/admin');
const articleRouter = require('./routes/articles');

const db_url = process.env.MONGO_URL;

//Data Processing Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

//--------Static Folder 'public'--------
app.use(express.static(path.join(__dirname,'public')));

// -----------------Database-----------------
mongoose.connect(db_url);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database\n----------------------------------'));

// -----------------Session-----------------
const store = new MongoDBSession({
	uri: db_url,
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

// -----------------GET-----------------
// Home
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/main.html');
});

// About
app.get('/about', (req, res) => {
	res.sendFile(__dirname + '/views/about.html');
});

// Login 
app.get('/loggedin', isAuth,(req, res) => {
	res.sendFile(__dirname + '/views/loggedin.html');
});

// 404 Error
app.get('/404', (req, res) => {
	res.sendFile(__dirname + '/views/404.html');
});

//----------------Blog------------------

app.set('view engine', 'ejs');
app.get('/articles', async (req, res)=>{
	const articles = await Article.find().sort({ createdAt: 'desc' });
	res.render('articles/index', { articles : articles });
});

//--------------------------------------

// The app.use("/admin", router) call means all valid URLs must start with the path /admin
// middleware functions that have access to req & res
app.use('/admin', adminRouter);
app.use('/articles', articleRouter); 

// -----------------Listening-----------------
app.listen(3000, ()=>{
	const port = process.env.PORT || 3000;
	console.log(`Listening to the port ${port}`);
	console.log(date.toLocaleTimeString());
});