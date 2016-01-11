import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import PostgresPage from './containers/PostgresPage'


let routes = (
  <Route path="/" handler={App}>
    <IndexRoute component={HomePage} />
    <Route path="/postgres/:id" component={PostgresPage} />
  </Route>
)

export default routes
