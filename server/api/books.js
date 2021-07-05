const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
	if (!isNaN(req.params.id)) return next();
	next(new Error('Invalid ID'));
}

function validBook(book) {
	const hasTitle = typeof book.title == 'string' && book.title.trim() != '';
	const hasAuthor =
		typeof book.author == 'string' && book.author.trim() != '';
	return hasTitle && hasAuthor;
}

// Read
router.get('/', (req, res) => {
	const { title, author, rating } = req.query;
	queries.getAll({ title, author, rating }).then(books => {
		res.json(books);
	});
});

// Read One
router.get('/:id', isValidId, (req, res, next) => {
	queries.getOne(req.params.id).then(book => {
		if (book) {
			res.json(book);
		} else {
			next();
		}
	});
});

// Create
router.post('/', (req, res, next) => {
	if (validBook(req.body)) {
		queries.create(req.body).then(books => {
			res.json(books[0]);
		});
	} else {
		next(new Error('Invalid Book'));
	}
});

// Update
router.put('/:id', isValidId, (req, res, next) => {
	if (validBook(req.body)) {
		queries.update(req.params.id, req.body).then(books => {
			res.json(books[0]);
		});
	} else {
		next(new Error('Invalid Book'));
	}
});

// Delete
router.delete('/:id', isValidId, (req, res) => {
	queries.delete(req.params.id).then(() => {
		res.json({
			deleted: true,
		});
	});
});

module.exports = router;
