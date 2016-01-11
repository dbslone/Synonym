import {createStore, applyMiddleware, compose} from 'redux'
import {persistState} from 'redux-devtools'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {compact} from 'lodash'

import rootReducer from '../reducers'
import postgres from '../middleware/postgres'
import DevTools from '../containers/DevTools'

const __DEV__ = process.env.NODE_ENV !== 'production'
  && process.env.NODE_ENV !== 'test'

// NOTE: compacting to remove the "false" value when in production
let middlewares = compact([
  applyMiddleware(thunk),
  __DEV__ && applyMiddleware(logger({collapsed: true}))
])

let enhancers = compact([
  ...middlewares,
  __DEV__ && DevTools.instrument(),
  __DEV__ && persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
])

const finalCreateStore = compose(...enhancers)(createStore)

export default function configureStore (initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    )
  }

  return store
}
