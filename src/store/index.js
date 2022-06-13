import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import logger from '../middlewares/logger'
import randomId from '../middlewares/randomId'
import api from '../middlewares/api'
import history from '../history'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history), randomId, api /*logger*/)
  // other store enhancers if any
)

const store = createStore(connectRouter(history)(reducer), enhancer)

//dev only!!!
window.store = store

export default store
