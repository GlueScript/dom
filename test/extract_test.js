var filter = require('../src/lib/filter'),
    assert = require('assert');

describe('filter', function() {
    describe('extract', function() {
        it('should return an empty array when no matches are found', function() {
            var input = '<html><body><p/></body></html>';
            var xpath = '//a/@href';
            var result = filter.extract(input, xpath, function(err, result){
                assert(!err);
                assert(result instanceof Array);
                assert.equal(0, result.length);
            });
        });
        it('should return an empty array when no xpath is supplied', function() {
            var input = '<html><body><p/></body></html>';
            var xpath = '';
            var result = filter.extract(input, xpath, function(err, result){
                assert(err);
                assert(result instanceof Array);
                assert.equal(0, result.length);
            });
        });
        it('should return an array of matches found', function() {
            var input = '<html><body><p/><a href="blah.html"/></body></html>';
            var xpath = '//a/@href';
            var result = filter.extract(input, xpath, function(err, result){
                assert(!err);
                assert(result instanceof Array);
                assert.equal(1, result.length);
                assert.equal('blah.html', result[0]);
            });
        });
        it('should return an empty array when no DOM document is supplied', function() {
            var input = 'not a document';
            var xpath = '//a/@href';
            var result = filter.extract(input, xpath, function(err, result){
                assert(!err);
                assert(result instanceof Array);
                assert.equal(0, result.length);
            });
        });
        it('should return an empty array when an invalid DOM document is supplied', function() {
            var input = '<? xml version="1.0" encoding="UTF-8" ?><doc><element name="dopy</doc>';
            var xpath = '//a/@href';
            var result = filter.extract(input, xpath, function(err, result){
                assert(!err);
                assert(result instanceof Array);
                assert.equal(0, result.length);
            });
        });
    });
});

