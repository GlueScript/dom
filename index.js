var app = require('express')();

// Constants
var PORT = 8780;

// App
app.get('/', function (req, res) {
    res.send('DOM: post a document with a filter query to extract the specified items.');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
