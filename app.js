var express = require('express')
var cors = require('cors')
var path = require('path');
var Yelp = require('yelp');

var app = express()
app.use(cors())

// Setup static files
app.use('/static', express.static(path.join(__dirname, '/build/static')))

// Setup Yelp API credentials
var yelp = new Yelp({
  consumer_key: 'consumer_key',
  consumer_secret: 'consumer_secret',
  token: 'token',
  token_secret: 'token_secret',
});


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.get('/search', (req, res) => {
  yelp.search({
      location: req.query.location,
      category_filter:'bars',
    })
    .then(function(data) {
      let jsonData = data.businesses
      res.json(jsonData.slice(0, 10))
    })
    .catch(function(err) {
      console.error(err);
    });
})

app.listen(4000, function() {
  console.log('Example app listening on port 4000!')
})
