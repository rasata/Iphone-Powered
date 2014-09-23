var dotAccess = require('../');
var should = require('chai').should();

describe('dotAccess', function () {
	describe('get', function () {
		it('should return get the correct value', function () {
			var user = {
				name: {
					first: 'Joe',
					last: 'M',
					status: {
						banned: true
					}
				}
			};
			dotAccess.get(user, 'name').should.be.an('object');
			dotAccess.get(user, 'name.first').should.equal('Joe');
			dotAccess.get(user, 'name.last').should.equal('M');
			dotAccess.get(user, 'name.status.banned').should.equal(true);
		});
		it('should set the correct value at the correct path', function () {
			var user = {
				name: {
					first: 'Joe',
					last: 'M',
					status: {
						banned: true
					}
				}
			};
			dotAccess.set(user, 'name.first', 'Bob');
			user.name.first.should.equal('Bob');
			dotAccess.set(user, 'name.status.banned', false);
			user.name.status.banned.should.equal(false);
			dotAccess.set(user, 'name.middle', 'H');
			user.name.middle.should.equal('H');
			dotAccess.set(user, 'name', 'Bob');
			user.name.should.equal('Bob');
		});
	});
});