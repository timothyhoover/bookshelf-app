describe('renders the home page', () => {
	it('renders app correctly', () => {
		cy.visit('/');
		cy.get('#container').should('exist');
	});

	it('adds book correctly', () => {
		cy.get('#title').type('Testing Bookshelf App - 23857420');
		cy.get('#author').type('Tim Hoover - 2342532');
		cy.get('#pubDate').type('2999 - 2343');
		cy.get('#rating').type('10');
		cy.get(':nth-child(1) > .btn-primary').click();
		cy.findAllByText('Testing Bookshelf App - 23857420').should('exist');
	});

	it('deletes book correctly', () => {
		cy.findAllByText('Testing Bookshelf App - 23857420')
			.should('exist')
			.get('.btn-danger')
			.click({ multiple: true });
	});

	it('No books message showing correctly', () => {
		cy.get('#title').type('Testing Bookshelf App - 23857420');
		cy.get('#author').type('Tim Hoover - 2342532');
		cy.get('#pubDate').type('2999 - 2343');
		cy.get('#rating').type('10');
		cy.get(':nth-child(1) > .btn-primary').click();
		cy.findAllByText('Testing Bookshelf App - 23857420')
			.should('exist')
			.get('.btn-danger')
			.click({ multiple: true });
		cy.findByText('There are no books to show. Create one!').should(
			'exist'
		);
	});
});
