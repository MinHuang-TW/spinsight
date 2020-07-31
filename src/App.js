import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Signup, Login, Home, Profile, AddQuestion } from './pages';
import { ThemeProvider } from 'styled-components';
import { theme } from './util/theme';
import './App.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/profile' component={Profile} />
            <Route path='/addQuestion' component={AddQuestion} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
