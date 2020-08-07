import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import store from './redux/store';
import { Provider } from 'react-redux';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { Signup, Login, Home, Profile, Question } from './pages';
import AuthRoute from './components/AuthRoute';
import { ThemeProvider } from 'styled-components';
import { theme } from './util/theme';
import './App.css';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <AuthRoute exact path='/signup' component={Signup} />
          <AuthRoute exact path='/login' component={Login} />

          <Route path='/getQuestion' component={Home} />
          <Route path='/addQuestion' component={Question} />
          <Route path='/profile' component={Profile} />

          <Redirect from='/' exact to='/getQuestion' />
          <Redirect to='/not-found' />
        </Switch>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

export default App;
