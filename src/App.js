import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './redux/store';

import { Signup, Login, Home, Profile, AddQuestion } from './pages';
import AuthRoute from './components/AuthRoute';
import { ThemeProvider } from 'styled-components';
import { theme } from './util/theme';
import './App.css';

const token = localStorage.FBIdToken;
let authenticated;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    localStorage.clear();
    authenticated = false;
  } else {
    authenticated = true;
  }
}
const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <AuthRoute
            exact
            path='/signup'
            component={Signup}
            authenticated={authenticated}
          />
          <AuthRoute
            exact
            path='/login'
            component={Login}
            authenticated={authenticated}
          />
          <Route path='/profile' component={Profile} />
          <Route path='/addQuestion' component={AddQuestion} />
        </Switch>
      </Router>
    </Provider>
  </ThemeProvider>
);

export default App;
