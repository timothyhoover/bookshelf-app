// Update with your config settings.

module.exports = {
	development: {
		client: 'pg',
		connection: 'postgres://localhost/tims-bookshelf',
	},

	test: {
		client: 'pg',
		connection: 'postgres://localhost/test-tims-bookshelf',
	},

	production: {
		client: 'pg',
		connection: {
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false,
			},
		},
	},
};
