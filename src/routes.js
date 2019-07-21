import React from 'react';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';

// Containers
import Full from './containers/Full/Full'
import WorkshopOne from './containers/WorkshopOne/WorkshopOne'

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
      <Route path="/workshop1/" name="Цех1 Осеменение" component={WorkshopOne} />
      <Route path="/workshop2/" name="Цех1 Осеменение" component={WorkshopOne} />
      <Route path="/workshop3/" name="Цех1 Осеменение" component={WorkshopOne} />
      <Route path="/workshop4/" name="Цех1 Осеменение" component={WorkshopOne} />
      <Route path="/workshop8/" name="Цех1 Осеменение" component={WorkshopOne} />
      <Route path="/workshop5/" name="Цех1 Осеменение" component={WorkshopOne} />
      <Route path="/workshop6/" name="Цех1 Осеменение" component={WorkshopOne} />
      <Route path="/workshop7/" name="Цех1 Осеменение" component={WorkshopOne} />
      <Route path="/workshop9/" name="Цех1 Осеменение" component={WorkshopOne} />
      <Route path="/workshop10/" name="Цех1 Осеменение" component={WorkshopOne} />
    </Router>
  )
};
