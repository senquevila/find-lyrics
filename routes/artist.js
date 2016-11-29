require('../env/config.js');

var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/:name', function(req, res, next) {
    console.log(req.params.name);

    var method = 'artist.search&artist=' + req.params.name;
    var url = process.env.LASTFM_URI + '?method=' + method
        + '&format=json&api_key=' + process.env.LASTFM_APIKEY;

    request(url, function(error, response, data) {
        if (error) {
            throw error;
        }

        var obj = {results: 0, artists: []};
        var values = JSON.parse(data);
        var artists = values.results.artistmatches.artist;

        if (artists === undefined) {
            res.send(400, 'No artist found!')
        } else {
            obj.results = artists.length;
            obj.artists = artists;
            res.json(obj);
        }
    });
});

module.exports = router;
