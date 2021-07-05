const knex = require('./knex');

module.exports = {
	getAll(query) {
		const knexQuery = knex('books');

		if (query.title) {
			knexQuery.where('title', 'like', `%${query.title}%`);
		}

		if (query.author) {
			knexQuery.where('author', 'like', `%${query.author}%`);
		}

		if (query.rating) {
			knexQuery.where('rating', query.rating);
		}
		return knexQuery;
	},

	getOne(id) {
		return knex('books').where('id', id).first();
	},

	create(book) {
		return knex('books').insert(book, '*');
	},

	update(id, book) {
		return knex('books').where('id', id).update(book, '*');
	},

	delete(id) {
		return knex('books').where('id', id).del();
	},
};
