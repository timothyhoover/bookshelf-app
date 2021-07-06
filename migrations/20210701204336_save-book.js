exports.up = function (knex) {
	// Create a table in the database called "books"
	return (
		knex.schema
			// Make sure no "books" table exists
			// before trying to create new
			.hasTable('books')
			.then(exists => {
				if (!exists) {
					// If no "books" table exists
					// create new, with "id", "author", "title",
					// "pubDate" and "rating" columns
					// and use "id" as a primary identification
					// and increment "id" with every new record (book)
					return knex.schema
						.createTable('books', table => {
							table.increments('id').primary();
							table.string('author');
							table.string('title');
							table.string('pubDate');
							table.integer('rating');
						})
						.then(() => {
							// Log success message
							console.log("Table 'Books' created");
						})
						.catch(error => {
							console.error(
								`There was an error creating table: ${error}`
							);
						});
				}
			})
			.then(() => {
				// Log success message
				console.log('done');
			})
			.catch(error => {
				console.error(
					`There was an error setting up the database: ${error}`
				);
			})
	);
};

exports.down = function (knex) {
	return knex.schema.dropTable('books');
};
