var app = require('express')(),
    winston = require('winston'),
    bodyParser = require('body-parser'),
    filter = require('./lib/filter');

/*
* Get winston to log uncaught exceptions and to not exit
*/
var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true
    })
  ],
  exitOnError: false
});

app.use(bodyParser.text({type : 'text/*', limit: '1024kb'}));
app.use(bodyParser.text({type : 'application/xml'}));

// App
app.get('/', function (req, res) {
    res.json({"description":"DOM - post a document with an xpath filter query (xpath=//a/@href) to extract the specified items"});
});

app.post('/', function(req, res) {
    // validation? let the filter module do that?
    var result = filter.extract(req.body, req.param('xpath'));
    res.json(result);
});

// use env.PORT if set
var PORT = process.env.PORT || 80;

app.listen(PORT);

logger.log('Running dom on http://localhost:' + PORT);
