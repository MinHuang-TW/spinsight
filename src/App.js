import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

import { Signup, Login, Home, Profile, AddQuestion } from './pages';
import AuthRoute from './components/AuthRoute';
import { ThemeProvider } from 'styled-components';
import { theme } from './util/theme';
import './App.css';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/signup' component={Signup} />
          <AuthRoute exact path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route path='/addQuestion' component={AddQuestion} />
        </Switch>
      </Router>
    </Provider>
  </ThemeProvider>
);

export default App;
