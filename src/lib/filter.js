var xpath = require('xpath'),
    parser = require('xmldom').DOMParser;

/*
 * extract items from input (a dom html/xml document) using filter parameter
 * return an array of 'items' 
 * allow filtering for elements or attributes
 */
exports.extract = function(input, filter) {

    var doc = new parser().parseFromString(input);

    // construct xpath - assume filter is an xpath
    var nodes = xpath.select(filter, doc);
    var items = [];
    nodes.forEach(function(i) {
        // works for elements and attributes
        if (i.firstChild){
            items.push(i.firstChild.toString());
        } else {
            items.push(i.value);
        }
    });
    return items;
};
