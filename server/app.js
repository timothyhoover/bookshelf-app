const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

const books = require('./api/books');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);
	next();
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../bookshelf-client/build')));

app.use('/books', books);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: req.app.get('env') === 'development' ? err : {},
	});
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
	res.sendFile(
		path.resolve(__dirname, '../bookshelf-client/build', 'index.html')
	);
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

module.exports = app;
