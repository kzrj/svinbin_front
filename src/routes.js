import React from 'react';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';

// Containers
import Full from './containers/Full/Full'

// components
import LandingPage from './components/LandingPage/LandingPage'

// Pages
// import AboutPage from './views/About/About'

// import requireAuthentication from './containers/AuthComponent';

export default function routes(store) {

  return (
    <Router history={hashHistory}>
      <Route path="/" name="Главная" component={Full} >
        <IndexRoute component={LandingPage} />
      </Route>
    </Router>
  )
};
