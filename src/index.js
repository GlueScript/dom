var app = require('express')(),
    logger = require('./lib/logger'),
    bodyParser = require('body-parser'),
    filter = require('./lib/filter');

app.use(bodyParser.text({type : 'text/*', limit: '1024kb'}));
app.use(bodyParser.text({type : 'application/xml', limit: '1024kb'}));
app.use(bodyParser.json({limit: '1024kb'}));

app.get('/', function (req, res) {
    res.json({
        name : 'dom',
        description : "Post a document with an xpath filter query (xpath=//a/@href) to extract the specified items"
    });
});

app.post('/', function(req, res) {
    filter.extract(req.body, req.param('xpath'), function(err, result) {
        if (!err){
            logger.log('info', 'Success');
            res.json(result);
        } else {
            logger.log('error', err);
            res.status(400).json(result);
        }
    });
});

var PORT = process.env.PORT || 80;
app.listen(PORT);
logger.log('info', 'Running dom service on http://localhost:' + PORT);
