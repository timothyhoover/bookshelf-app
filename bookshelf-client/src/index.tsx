import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import { Bookshelf } from './components/bookshelf';

// Find div container
const rootElement = document.getElementById('root');

// Render Bookshelf component in the DOM
render(<Bookshelf />, rootElement);
