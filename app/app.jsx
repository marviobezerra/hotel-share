import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import SignUpPage from './components/SignUpPage.jsx';
import LoginPage from './components/LoginPage.jsx';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>,
   document.getElementById('root'));
