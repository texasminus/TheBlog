const express =require('express');
const path = require('path');
const router = express.Router();
const app = express();

// //Data Processing Middlewares
app.use(express.urlencoded({extended: false}));

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

router.get('/', (req, res)=>{
    res.sendFile(path.dirname(__dirname) + '/views/blog.html');
});

router.get('/newArticle', (req, res)=>{
    res.sendFile(path.dirname(__dirname) + '/views/newArticle.html');
});

module.exports = router;