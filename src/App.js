import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import { BOOKS, HOME, SIGN_IN, SIGN_UP } from 'pathnameVariables';
import PrivateRoute from 'PrivateRoute';

import Home from 'pages/Home';
import Books from 'pages/Books';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import NotFound from 'pages/NotFound';
import BookReader from 'pages/BookReader';

import './globalStyles.css';
import './scssVariables.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={SIGN_IN} element={<SignIn />} />
        <Route exact path={SIGN_UP} element={<SignUp />} />

        <Route path={HOME} element={<PrivateRoute element={<Home />} />} >
          <Route exact path={BOOKS} element={<Books />} />
          <Route exact path={`${BOOKS}/:bookId`} element={<BookReader />} />
          <Route path={HOME} element={<Navigate to={BOOKS} replace />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
