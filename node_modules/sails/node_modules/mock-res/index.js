// Mocks http.ServerResponse

module.exports = MockServerResponse;

var Transform = require('stream').Transform,
	util = require('util');

function MockServerResponse(finish) {
	Transform.call(this);

	this.statusCode = 200;

	this._headers = {};
	if (typeof finish === 'function')
		this.on('finish', finish);
}

util.inherits(MockServerResponse, Transform);

MockServerResponse.prototype._transform = function(chunk, encoding, next) {
	this.push(chunk);
	next();
};

MockServerResponse.prototype.setHeader = function(name, value) {
	this._headers[name.toLowerCase()] = value;
};

MockServerResponse.prototype.getHeader = function(name) {
	return this._headers[name.toLowerCase()];
};

MockServerResponse.prototype.removeHeader = function(name) {
	delete this._headers[name.toLowerCase()];
};

MockServerResponse.prototype._getString = function() {
	return Buffer.concat(this._readableState.buffer).toString();
};

MockServerResponse.prototype._getJSON = function() {
	return JSON.parse(this._getString());
};

/* Not implemented:
MockServerResponse.prototype.writeContinue()
MockServerResponse.prototype.writeHead(statusCode, [reasonPhrase], [headers])
MockServerResponse.prototype.setTimeout(msecs, callback)
MockServerResponse.prototype.headersSent
MockServerResponse.prototype.sendDate
MockServerResponse.prototype.addTrailers(headers)
*/