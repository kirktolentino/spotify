const express = require('express');
const multer = require('multer');
const router = express.Router();
const main = require('../controller/spot_controller');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });


router.get('/', main.getAllspot);
router.get('/song/:id', main.getSong);
router.get('/add', (req, res) => res.render('add')); 
router.post('/add', upload.fields([{ name: 'songFile' }, { name: 'imageFile' }]), main.addSong); 
router.post('/delete/:id', main.deleteSong); 
router.get('/edit/:id', main.getEditSong); 
router.post('/edit/:id', upload.fields([{ name: 'songFile' }, { name: 'imageFile' }]), main.editSong);

// Route to render the add song form
router.get('/add-song', (req, res) => {
    res.render('addSong'); 
});

// Route to handle form submission
router.post('/add-song', (req, res) => {
    const newSong = {
        id: songQueue.length + 1, 
        title: req.body.title,
        artist: req.body.artist
    };
    songQueue.push(newSong); 
    res.redirect('/queue'); 
});

// Initialize songQueue as an empty array
let songQueue = [];

// Route to display the playlist (your existing code)
router.get('/', (req, res) => {
    res.render('index', { spot: songList });  // Assuming 'songList' holds all songs
});

// Route to add a song to the queue
router.post('/add-song', (req, res) => {
    const newSong = {
        id: req.body.id,
        title: req.body.title,
        artist: req.body.artist,
        file_path: req.body.file_path,
        image: req.body.image,
        lyrics: req.body.lyrics
    };

    // Add the song to the queue
    songQueue.push(newSong);

    // Redirect to the queue page after adding the song
    res.redirect('/queue');
});

// Route to display the queue
router.get('/queue', (req, res) => {
    res.render('queue', { songQueue });  // Pass songQueue, not queue
});


module.exports = router;