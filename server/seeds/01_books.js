const books = require('../books');

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('books')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('books').insert(books);
		});
};
