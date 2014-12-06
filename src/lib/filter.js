var xpath = require('xpath'),
    parser = require('xmldom').DOMParser;

/*
 * extract items from input (a dom html/xml document) using filter parameter
 * return an array of raw items 
 * allow filtering for elements or attributes
 */
exports.extract = function(input, filter, callback) {

    var items = [];
    if ('' == filter) {
        console.log('empty xpath filter');
    }
    // construct xpath - assume filter is an xpath
    try {
        var doc = new parser().parseFromString(input);
        var nodes = xpath.select(filter, doc);
        nodes.forEach(function(i) {
            // works for elements and attributes
            if (i.firstChild){
                items.push(i.firstChild.toString());
            } else {
                items.push(i.value);
            }
        });
    } catch (e){
        console.log(e);
    }
    callback(items);
};
