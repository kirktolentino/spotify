const db = require('../config/db');

const SongModel = {
    getAllspot: (callback) => {
        db.query('SELECT * FROM spot', callback);
    },
    addSong: (newSong, callback) => {
        db.query('INSERT INTO spot SET ?', newSong, callback);
    },
    deleteSong: (id, callback) => {
        db.query('DELETE FROM spot WHERE id = ?', [id], callback);
    },
    getSongById: (id, callback) => {
        const query = "SELECT * FROM spot WHERE id = ?";
        db.query(query, [id], callback);
   },  
    updateSong: (id, updatedSong, callback) => {
        db.query('UPDATE spot SET ? WHERE id = ?', [updatedSong, id], callback);
    }
};

module.exports = SongModel;