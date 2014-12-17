var xpath = require('xpath'),
    DOMParser = require('xmldom').DOMParser;

/*
 * extracts items from input (a dom html/xml document) using filter parameter
 * returns an array of raw string items 
 * allows filtering for elements or attributes
 */
exports.extract = function(input, filter, callback) {

    var items = [];
    
    // construct xpath - assume filter is an xpath
    try {
        // pass in stub error callbacks to suppress error logging due to parse errors
        var doc = new DOMParser({
            locator: {},
            errorHandler: {
                error: function(){},
                fatalError: function(){}
            }
        }).parseFromString(input);

        var nodes = xpath.select(filter, doc);
        nodes.forEach(function(i) {
            // works for elements and attributes
            if (i.firstChild){
                items.push(i.firstChild.toString());
            } else {
                items.push(i.value);
            }
        });
        callback(null, items);

    } catch (e){
        // send the error back to caller
        callback(e, items);
    }
};
