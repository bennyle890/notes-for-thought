const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const app = express();
// const notesJava = require('./public/assets/js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static('public'));

const notes = [];

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/api/notes', function(req, res) {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data)
        res.json(JSON.parse(data));
    })
});

app.post('/api/notes', function(req, res) {
    const newNote = req.body;
    req.body.id = Math.floor(Math.random() * 10000) + 1;
    notes.push(newNote);
    fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), err => {
        if(err) {
            console.log(err);
        }
    })
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`Notes for Thought now live on port ${PORT}!`);
});