var app = require('express')(),
    bodyParser = require('body-parser'),
    filter = require('./lib/filter');

app.use(bodyParser.text({type : 'text/*', limit: '1024kb'}));
app.use(bodyParser.text({type : 'application/xml'}));

// use env.PORT if set
var PORT = 8780;

// App
app.get('/', function (req, res) {
    res.json({"description":"DOM - post a document with an xpath filter query (f=//a/@html) to extract the specified items"});
});

app.post('/', function(req, res) {
    // validation? let the filter module do that?
    
    // get document from request body
    // get filter from query string
    // invoke business logic using doc and filter
    var result = filter.extract(req.body, req.param('f'));

    // respond with json array of 0+ items
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
});

app.listen(PORT);

console.log('Running on http://localhost:' + PORT);
