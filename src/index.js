var app = require('express')(),
    bodyParser = require('body-parser')

app.use(bodyParser.text({type : 'text/html'}))
app.use(bodyParser.json())

// use env.PORT if set
var PORT = 8780;

// App
app.get('/', function (req, res) {
    res.send('DOM: post a document with a filter query to extract the specified items.');
});

app.post('/', function(req, res) {

    // get filter from query string
    var filter = req.param('f')

    // get document from request body
    var doc = req.body

    console.log('incoming post request: '+ doc)
    console.log('incoming post params: '+ filter)

    // invoke business logic using doc and filter

    // respond with json array of 0+ items
    res.setHeader('Content-Type', 'application/json')
    res.send(doc)
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
