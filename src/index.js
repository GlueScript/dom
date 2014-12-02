var app = require('express')(),
    bodyParser = require('body-parser'),
    filter = require('./lib/filter');

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
var PORT = process.env.PORT || 8780;

app.listen(PORT);

console.log('Running on http://localhost:' + PORT);
