var app = require('express')(),
    bodyParser = require('body-parser'),
    extract = require('./lib/extract');

app.use(bodyParser.text({type : 'text/*'}));
app.use(bodyParser.text({type : 'application/xml'}));
app.use(bodyParser.json());

// use env.PORT if set
var PORT = 8780;

// App
app.get('/', function (req, res) {
    res.send('DOM: post a document with a filter query to extract the specified items.');
});

app.post('/', function(req, res) {

    // get filter from query string
    var filter = req.param('f');

    // get document from request body
    var doc = req.body;

    // invoke business logic using doc and filter
    var result = extract.filter(doc, filter);

    // respond with json array of 0+ items
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
