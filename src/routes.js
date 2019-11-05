import React from 'react';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';

// Containers
import Main from './containers/Main'
import WorkshopOne from './containers/WorkshopOne'
import WorkshopTwo from './containers/WorkshopTwo'
import WorkshopThree from './containers/WorkshopThree'
import WorkshopFour from './containers/WorkshopFour'
// import WorkshopEight from './containers/WorkshopEight/WorkshopEight'
// import WorkshopFive from './containers/WorkshopFive/WorkshopFive'
// import WorkshopSix from './containers/WorkshopSix/WorkshopSix'
// import WorkshopSeven from './containers/WorkshopSeven/WorkshopSeven'
// import WorkshopSevenFive from './containers/WorkshopSevenFive/WorkshopSevenFive'

// components
import MainPage from './components/MainPage'

// Pages

// import requireAuthentication from './containers/AuthComponent';

export default function routes(store) {

  return (
    <Router history={hashHistory}>
      <Route path="/" name="Главная" component={Main} >
        <IndexRoute component={MainPage} />
      </Route>
      <Route path="/workshop1/" name="Цех1 Осеменение" component={WorkshopOne} />
      <Route path="/workshop2/" name="Цех2 Ожидание родов" component={WorkshopTwo} />
      <Route path="/workshop3/" name="Цех3 Маточник" component={WorkshopThree} />
      <Route path="/workshop4/" name="Цех4 Доращивание" component={WorkshopFour} />
      {/* <Route path="/workshop8/" name="Цех8 Доращивание" component={WorkshopEight} />
      <Route path="/workshop5/" name="Цех5 Откорм" component={WorkshopFive} />
      <Route path="/workshop6/" name="Цех6 Откорм" component={WorkshopSix} />
      <Route path="/workshop7/" name="Цех7 Откорм" component={WorkshopSeven} />
      <Route path="/workshop75/" name="Цех7-5 Секция ремонтных свинок" component={WorkshopSevenFive} />
      <Route path="/workshop9/" name="Убойный Цех" component={WorkshopOne} />
      <Route path="/workshop10/" name="Крематорий" component={WorkshopOne} /> */}
    </Router>
  )
};
