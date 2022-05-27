const express = require('express');
const app = express();
const path = require('path');

app.use(express.json()); // Need this to use req.body
//Data
const users = [

];
//Static Folder 'Public'
app.use(express.static(path.join(__dirname,'public')));

// GET
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/main.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/blog', (req, res) => {
    res.sendFile(__dirname + '/views/blog.html');
});

// POST
app.post('/', (req, res) => {
    const user = {
        id: users.length + 1,
        Name: req.query.Name,
        Password: req.query.Password
    };
    users.push(user); //add it to the original object
    res.send(user);    //return it
});


// Listening
app.listen(3000, ()=>{
    const port = process.env.PORT || 3000;
    console.log(`Listening to the port ${port}`);
});