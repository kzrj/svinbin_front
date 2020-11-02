import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Provider } from 'react-redux';
import configureStore from './redux/store/';

// Containers
import Main from './containers/Main'
import WorkshopOne from './containers/WorkshopOne'
import WorkshopTwo from './containers/WorkshopTwo'
import WorkshopThree from './containers/WorkshopThree'
import WorkshopFour from './containers/WorkshopFour'
import WorkshopEight from './containers/WorkshopEight'
import WorkshopFive from './containers/WorkshopFive'
import WorkshopSix from './containers/WorkshopSix'
import WorkshopSeven from './containers/WorkshopSeven'
import WorkshopBoarContainer from './containers/WorkshopBoar'
import ReportsContainer from './containers/ReportsContainer'
import requireAuthentication from './containers/AuthContainer';

// components
import MainPage from './components/MainPage'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div classname='app' id="page">
      {/* <Header /> */}
        {/* <div className='footer'>
          <p className='foot-title'>Домашняя продукция</p>
        </div> */}
        {/* <div className="page-content header-clear"> */}
        <div className="page-content">
          <Switch>
            <Route exact path="/" name="Главная" component={Main} >
              <MainPage />
            </Route>
            <Route path="/workshop1/" name="Цех1 Осеменение" 
              component={requireAuthentication(WorkshopOne, [1])} />
            <Route path="/workshop2/" name="Цех2 Ожидание родов" 
              component={requireAuthentication(WorkshopTwo, [1])} />
            <Route path="/workshop3/" name="Цех3 Маточник" 
              component={requireAuthentication(WorkshopThree, [3])} />
            <Route path="/workshop4/" name="Цех4 Доращивание" 
              component={requireAuthentication(WorkshopFour, [4])} />
            <Route path="/workshop8/" name="Цех8 Доращивание" 
              component={requireAuthentication(WorkshopEight, [8])} />
            <Route path="/workshop5/" name="Цех5 Откорм" 
              component={requireAuthentication(WorkshopFive, [5])} />
            <Route path="/workshop6/" name="Цех6 Откорм" 
              component={requireAuthentication(WorkshopSix, [6])} />
            <Route path="/workshop7/" name="Цех7 Откорм" 
              component={requireAuthentication(WorkshopSeven, [7])} />
            <Route path="/workshop_boar/" name="Хрячник" 
              component={requireAuthentication(WorkshopBoarContainer, null)} />
            <Route path="/reports/" name="Отчёты" component={requireAuthentication(ReportsContainer, [3])} />
            <Route path="/reports/tours/" name="Отчёты по турам" 
              component={requireAuthentication(ReportsContainer, [1])} />
            <Route path="/reports/tours_v2/" name="Отчет по турам V2" 
              component={requireAuthentication(ReportsContainer, [1])} />
            <Route path="/reports/director/" name="Отчёт директору" 
              component={requireAuthentication(ReportsContainer, [1])} />
            <Route path="/reports/operations/" name="Операции" 
              component={requireAuthentication(ReportsContainer, [1])} />
            <Route path="/reports/ws3report/" name="Отчёт Цех3" 
              component={requireAuthentication(ReportsContainer, [3])} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>, document.getElementById('root')
);
