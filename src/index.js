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
app.use(bodyParser.text({type : 'application/xml', limit: '1024kb'}));

app.get('/', function (req, res) {
    res.json({
        name : 'dom',
        description : "Post a document with an xpath filter query (xpath=//a/@href) to extract the specified items"
    });
});

app.post('/', function(req, res) {
    filter.extract(req.body, req.param('xpath'), function(err, result) {
        if (!err){
            res.json(result);
        } else {
            console.log(err);
            res.status(400).json(result);
        }
    });
});

var PORT = process.env.PORT || 80;
app.listen(PORT);
logger.log('info', 'Running dom service on http://localhost:' + PORT);
