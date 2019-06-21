import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import UserInput from './UserInput';
import Results from './Results';

// import Dashboard from './components/Dashboard'
// import Wizard from './components/Wizard'
// import Cards from './components/Cards'
// import Main from './components/Main' 
// import Signup from './components/Signup'

// import Dashboard_update from './components/Dashboard_update';
// import SingleStockDash from './components/SingleStockDash';


export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ UserInput } />
          <Route exact path='/results' component={ Results } />
          {/* <Route exact path='/signup' component={ Signup } />
          <Route exact path='/wizard' component={ Wizard } />
          <Route exact path='/cards' component={ Cards } /> */}
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )