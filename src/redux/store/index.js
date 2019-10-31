import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware, routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
// import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as formReducer } from 'redux-form';

export const reducers = combineReducers({
  routing: routerReducer,
  auth: require('../redux-sauce/auth').reducer,
  locations: require('../redux-sauce/locations').reducer,
  sections: require('../redux-sauce/sections').reducer,
  tours: require('../redux-sauce/tours').reducer,
  sows: require('../redux-sauce/sows').reducer,
  nomadPiglets: require('../redux-sauce/nomadPiglets').reducer,
  newbornPiglets: require('../redux-sauce/newbornPiglets').reducer,
  wsData: require('../redux-sauce/wsData').reducer,
  ws4: require('../redux-sauce/ws4').reducer,
  ws8: require('../redux-sauce/ws8').reducer,
  ws5: require('../redux-sauce/ws5').reducer,
  ws6: require('../redux-sauce/ws6').reducer,
  ws7: require('../redux-sauce/ws7').reducer,
  ws75: require('../redux-sauce/ws75').reducer,
  form: formReducer,
  // notifications: notifications
})

export default (history) => {
  const rMiddleware = routerMiddleware(history)
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(sagaMiddleware, rMiddleware)
  ));

  let sagasManager = sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}

