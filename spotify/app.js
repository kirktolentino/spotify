const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const routes = require('./routes/router');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Route to render the queue
app.get('/queue', (req, res) => {
    res.render('queue', { songs: songQueue });
});

// Route for song details
app.get('/song/:id', (req, res) => {
    const id = req.params.id;
    // Fetch the song from the database using the id
    // Assuming you have a function `getSongById`
    const song = getSongById(id); // Replace this with actual database logic
    res.render('songDetails', { song });
});

// Start the server
app.listen(1000, () => {
    console.log('Server running on http://localhost:1000');
});
