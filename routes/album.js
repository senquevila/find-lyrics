require('../env/config.js');

var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/:name', function(req, res, next) {
    var method = 'artist.gettopalbums&artist=' + req.params.name;
    var url = process.env.LASTFM_URI + '?method=' + method + '&format=json&api_key='
        + process.env.LASTFM_APIKEY;

    request(url, function(error, response, data) {
        if (error) {
            throw error;
        }

        var obj = {results: 0, albums: []};
        var values = JSON.parse(data);
        var albums = values.topalbums.album;

        if (albums === undefined) {
            res.send(400, 'No album found!');
        } else {
            obj.results = albums.length;
            obj.albums = albums;
            res.json(obj);
        }
    });
});

module.exports = router;
