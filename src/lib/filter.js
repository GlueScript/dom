var xpath = require('xpath'),
    DOMParser = require('xmldom').DOMParser,
    _ = require('underscore');

/*
 * extracts items from input (a dom html/xml document) using filter parameter
 * returns an array of raw string items 
 * allows filtering for elements or attributes
 */
exports.extract = function(input, filter, callback) {

    var items = [];
    input = _.isArray(input) ? input : [input];

    try {
        _.each(input, function(input_doc) {
            // pass in stub error callbacks to suppress error logging due to parse errors
            var document = new DOMParser({
                locator: {},
                errorHandler: {
                    error: function(){},
                    fatalError: function(){}
                }
            }).parseFromString(input_doc);

            _.each(xpath.select(filter, document), function(node) {
                // works for elements and attributes
                if (node.firstChild){
                    items.push(node.firstChild.toString());
                } else {
                    items.push(node.value);
                }
            });
        });

        callback(null, items);

    } catch (e){
        // send the error back to caller
        callback(e, items);
    }
};
