dom
===

Node service to work on DOM documents using xpath

Usage:

  curl -X POST -d @web-page.html -H 'Content-Type: text/html' 'http://dom.service/?f=//a/@href'

This will respond with a json array of the href attribute elements contained by the document.
