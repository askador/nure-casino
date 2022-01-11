import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './index.scss'
import './styles/index.scss'
import {NavBar} from './components'
import routes from './routes'

ReactDOM.render(
  <Router>
    <NavBar />
    <Switch >
      {routes.map(({ path, component }, index) =>
        <Route exact key={index} path={path} component={component} />
      )}
      <Redirect to='/' />
    </Switch >
    <div className='footer'></div>
  </Router>,
  document.getElementById('root')
)
