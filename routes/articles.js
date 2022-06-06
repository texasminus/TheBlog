const { resolveSoa } = require('dns');
const express =require('express');
const path = require('path');
const article = require('../models/article');
const router = express.Router();
const app = express();

const Article = require('../models/article');

router.get('/', (req, res)=>{
    res.sendFile(path.dirname(__dirname) + '/views/blog.html');
});

router.get('/newArticle', (req, res)=>{
    res.sendFile(path.dirname(__dirname) + '/views/newArticle.html');
});


router.post('/newArticle', async (req, res)=>{
    const { title, content } = req.body;
    const article = new Article({
        title,
        content
    });
    try {
        console.log("Title: "+req.body.title);
        console.log("Content: "+req.body.content+"\n");
        const newArticle = await article.save();
    } catch(err){
        res.status(400).json({ message: err.message })
    };
});

module.exports = router;