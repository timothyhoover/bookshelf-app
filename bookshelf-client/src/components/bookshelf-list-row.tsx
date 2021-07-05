// Import deps
import React from 'react';
import Button from 'react-bootstrap/Button';
import { TrashFill } from 'react-bootstrap-icons';

// Create interfaces
interface BookshelfListRowUI {
	position: number;
	book: {
		id: number;
		author: string;
		title: string;
		pubDate: string;
		rating: string;
	};
	handleBookRemove: (id: number, title: string) => void;
}

// Create BookshelfListRow component
export const BookshelfListRow = (props: BookshelfListRowUI) => {
	return (
		<tr>
			<td className="col-1">{props.position}</td>

			<td className="col-1">{props.book.title}</td>

			<td className="col-1">{props.book.author}</td>

			<td className="col-1">{props.book.pubDate}</td>

			<td className="col-1">{props.book.rating}</td>

			<td className="col-1">
				<Button
					className="btn-danger ml-3"
					onClick={() =>
						props.handleBookRemove(props.book.id, props.book.title)
					}
				>
					<TrashFill />
				</Button>
			</td>
		</tr>
	);
};
