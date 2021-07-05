const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');

const app = require('../app');

const fixtures = require('./fixtures');

describe('CRUD Books', () => {
	before(done => {
		// run migrations
		knex.migrate
			.latest()
			.then(() => {
				// run seeds
				return knex.seed.run();
			})
			.then(() => done());
	});

	it('Lists all records', done => {
		request(app)
			.get('/books')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body).to.be.a('array');
				expect(res.body).to.deep.equal(fixtures.books);
				done();
			});
	});

	it('Show one record by id', done => {
		request(app)
			.get('/books/1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.deep.equal(fixtures.books[0]);
				done();
			});
	});

	it('Show one record by id', done => {
		request(app)
			.get('/books/3')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.deep.equal(fixtures.books[2]);
				done();
			});
	});

	it('Creates a record', done => {
		request(app)
			.post('/books')
			.send(fixtures.book)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body).to.be.a('object');
				fixtures.book.id = res.body.id;
				expect(res.body).to.deep.equal(fixtures.book);
				done();
			});
	});

	it('Updates a record', done => {
		fixtures.book.rating = 10;
		request(app)
			.put('/books/4')
			.send(fixtures.book)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.deep.equal(fixtures.book);
				done();
			});
	});

	it('Deletes a record', done => {
		request(app)
			.delete('/books/4')
			.send(fixtures.book)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.deep.equal({
					deleted: true,
				});
				done();
			});
	});
});
