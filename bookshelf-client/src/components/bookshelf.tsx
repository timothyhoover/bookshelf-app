import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookshelfList } from './bookshelf-list';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Bookshelf = () => {
	const [author, setAuthor] = useState('');
	const [title, setTitle] = useState('');
	const [pubDate, setPubDate] = useState('');
	const [rating, setRating] = useState('');
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch all books on initial render
	useEffect(() => {
		fetchBooks();
	}, []);

	// Fetch all books
	const fetchBooks = async () => {
		// Send GET request to 'books/all' endpoint
		axios
			.get('/books')
			.then(response => {
				// Update the books state
				setBooks(response.data);

				// Update loading state
				setLoading(false);
			})
			.catch(error =>
				console.error(
					`There was an error retrieving the book list: ${error}`
				)
			);
	};

	// Reset all input fields
	const handleInputsReset = () => {
		setAuthor('');
		setTitle('');
		setPubDate('');
		setRating('');
	};

	// Create new book
	const handleBookCreate = () => {
		// Send POST request to 'books/create' endpoint
		axios
			.post('/books', {
				author: author,
				title: title,
				pubDate: pubDate,
				rating: rating,
			})
			.then(res => {
				console.log(res.data);

				// Fetch all books to refresh
				// the books on the bookshelf list
				fetchBooks();
			})
			.catch(error =>
				console.error(
					`There was an error creating the ${title} book: ${error}`
				)
			);
	};

	// Submit new book
	const handleBookSubmit = () => {
		// Check if all fields are filled
		if (
			author.length > 0 &&
			title.length > 0 &&
			pubDate.length > 0 &&
			rating.length > 0
		) {
			// Create new book
			handleBookCreate();

			console.info(`Book ${title} by ${author} added.`);

			// Reset all input fields
			handleInputsReset();
		}
	};

	// Remove book
	const handleBookRemove = (id: number, title: string) => {
		// Send PUT request to 'books/delete' endpoint
		axios
			.delete(`/books/${id}`)
			.then(() => {
				console.log(`Book ${title} removed.`);

				// Fetch all books to refresh
				// the books on the bookshelf list
				fetchBooks();
			})
			.catch(error =>
				console.error(
					`There was an error removing the ${title} book: ${error}`
				)
			);
	};

	return (
		<Row
			className="d-flex flex-column justify-content-center align-items-center w-100 vh-100"
			id="container"
		>
			<div className="w-75 p-5 shadow p-3 mb-5 bg-white rounded">
				{/* Form for creating new book */}
				<div>
					<Form
						onSubmit={handleBookSubmit}
						className="d-flex justify-content-center align-items-center flex-column"
					>
						<Row className="w-100">
							<Col className="px-0 mx-0">
								<fieldset>
									<Form.Group controlId="title">
										<Form.Label>Enter title:</Form.Label>
										<Form.Control
											size="lg"
											type="text"
											id="title"
											name="title"
											value={title}
											onChange={e =>
												setTitle(e.currentTarget.value)
											}
										/>
									</Form.Group>
								</fieldset>
							</Col>
							<Col>
								<fieldset>
									<Form.Group controlId="author">
										<Form.Label>Enter Author:</Form.Label>
										<Form.Control
											size="lg"
											type="text"
											id="author"
											name="author"
											value={author}
											onChange={e =>
												setAuthor(e.currentTarget.value)
											}
										/>
									</Form.Group>
								</fieldset>
							</Col>
						</Row>

						<Row className="w-100">
							<Col className="px-0 mx-0">
								<fieldset>
									<Form.Group controlId="pubDate">
										<Form.Label>
											Enter publication date:
										</Form.Label>
										<Form.Control
											size="lg"
											type="text"
											id="pubDate"
											name="pubDate"
											value={pubDate}
											onChange={e =>
												setPubDate(
													e.currentTarget.value
												)
											}
										/>
									</Form.Group>
								</fieldset>
							</Col>

							<Col>
								<fieldset>
									<Form.Group controlId="rating">
										<Form.Label>Enter rating:</Form.Label>
										<Form.Control
											size="lg"
											type="text"
											id="rating"
											name="rating"
											value={rating}
											onChange={e =>
												setRating(e.currentTarget.value)
											}
										/>
									</Form.Group>
								</fieldset>
							</Col>
						</Row>
					</Form>
					<Button
						onClick={handleBookSubmit}
						className="btn-primary mt-2 mb-5"
					>
						Add book
					</Button>
				</div>

				{/* Render bookshelf list component */}
				<BookshelfList
					books={books}
					loading={loading}
					handleBookRemove={handleBookRemove}
				/>

				{/* Show reset button if list contains at least one book */}
				{/* {books.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>
          Reset books list.
        </button>
      )} */}
			</div>
		</Row>
	);
};
