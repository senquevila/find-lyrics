require('../env/config.js');

var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/:name/album/:album/', function(req, res, next) {
    var method = 'album.getinfo&artist=' + req.params.name + '&album='
        + req.params.album;
    var url = process.env.LASTFM_URI + '?method=' + method
        + '&format=json&api_key=' + process.env.LASTFM_APIKEY;

    request(url, function(error, response, data) {
        if (error) {
            throw error;
        }

        var obj = {results: 0, songs: []};
        var values = JSON.parse(data);
        var songs = values.album.tracks.track;

        if (songs === undefined) {
            res.send(400,'No songs found!');
        } else {
            obj.results = songs.length;
            obj.songs = songs;
            res.json(obj);
        }
    });
});

module.exports = router;
