dom
===

Node service to work on DOM documents using xpath. Post your document with the correct Content-Type header and a query param containing an xpath.

Usage:

  curl -X POST -d @web-page.html -H 'Content-Type: text/html' 'http://dom.service/?xpath=//a/@href'

This will respond with a json array of the href attributes of anchor contained by the document.
