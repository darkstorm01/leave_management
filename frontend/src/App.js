import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/login';
import Manager from './components/manager';
import Employee from './components/employee';
import Applyleave from './components/applyleave'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App" >
          <Route exact path='/m'><Manager /></Route>
          <Route exact path='/e'><Employee /></Route>
          <Route exact path='/e/apply_leave'><Applyleave /></Route>
          <Route exact path='/'><Login /></Route>
        </div>
      </Router>
    );
  }
}

export default App;
