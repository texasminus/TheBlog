const express =require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res)=>{
    res.sendFile(path.dirname(__dirname) + '/views/blog.html');
});

router.get('/newArticle', (req, res)=>{
    res.sendFile(path.dirname(__dirname) + '/views/newArticle.html');
});

module.exports = router;