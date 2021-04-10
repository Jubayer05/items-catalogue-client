/* eslint-disable arrow-body-style */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Particle from './components/Particle/Particle';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <Container className="container" maxWidth="lg">
      <Router>
        <Particle />
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
