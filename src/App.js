import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { Provider } from 'react-redux'

import { ABOUT, BOOKS, HOME, SETTINGS, SIGN_IN, SIGN_UP } from 'pathnameVariables';
import PrivateRoute from 'PrivateRoute';

import Home from 'pages/Home';
import Books from 'pages/Books';
import About from 'pages/About';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Settings from 'pages/Settings';
import NotFound from 'pages/NotFound';
import BookReader from 'pages/BookReader';
import store from './store'

import './globalStyles.css';
import './scssVariables.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path={SIGN_IN} element={<SignIn />} />
          <Route exact path={SIGN_UP} element={<SignUp />} />

          <Route path={HOME} element={<PrivateRoute element={<Home />} />} >
            <Route exact path={BOOKS} element={<Books />} />
            <Route exact path={`${BOOKS}/:bookId`} element={<BookReader />} />
            <Route exact path={SETTINGS} element={<Settings />} />
            <Route exact path={ABOUT} element={<About />} />
            <Route path={HOME} element={<Navigate to={BOOKS} replace />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
