var express = require('express')
var cors = require('cors')
var path = require('path');
var Yelp = require('yelp');

var app = express()
app.use(cors())

app.set('port', (process.env.PORT || 5000));

// Setup static files
app.use('/static', express.static(path.join(__dirname, '/build/static')))

// Setup Yelp API credentials
var yelp = new Yelp({
  consumer_key: 'KBi3c2r8SkkWCVmQ2KOdSg',
  consumer_secret: 'cHqYNM7jUAuzVdD9TSckjUgnbRA',
  token: '-WScjm5JnF0N8hlS4lbvW-1Y3LrPIruU',
  token_secret: 'xLySkypWm2q4WbWMAegHZ_0Ny1Q',
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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
