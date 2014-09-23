# js-xmlify

Use npm to install the package:

    npm install js-xmlify

Before rendering a JavaScript object in XML, you may do:

    var xmlify = require('js-xmlify');
    var data; // your JavaScript object (or array)
    xmlify.prerender(data); // object is modified inline
    
    // render data as XML, e.g., using 'js2xmlparser'

In case you parsed data from XML to a JavaScript object, you may do:

    var xmlify = require('js-xmlify');
    var data; // read and parse XML document, e.g., using 'xml2js'
    xmlify.postparse(data); // object is modified inline
