/*
 * This is a simple Express app to overcome the CORS limitation if we were to 
 * attempt to peform the GET request directly from the client (browser).
 * 
 * The main app (in index.js) makes a GET request to localhost:3000/address.
 * This app then makes the GET request to the Auspost API.
 *
 */
var express = require('express')
var request = require('request')
var app = express();

app.get('/address', function(req, res) {
    var options = {
      url: 'https://digitalapi.auspost.com.au/postcode/search.json?q=' + req.query.q,
      headers: {
        'auth-key': '872608e3-4530-4c6a-a369-052accb03ca8'
      },
      method: 'GET'
    };

    request(options, function(error, response, body) {
      if (!error) {
        res
          .set('Access-Control-Allow-Origin', '*')
          .status(200)
          .send(body)
      } else {
        res
        .set('Access-Control-Allow-Origin', '*')
        .status(500)
        .send(error)
      }

    })
});

app.listen(3000);