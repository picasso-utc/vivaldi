import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Home from './Home'
import Admin from './Admin'
import Notation from './Notation'
import Charte from './Charte'
import error404 from './error404'

class Index extends Component{

  render() {
    return(
      <Router>
        <div>
          <nav className="navbar navbar-dark bg-light fixed-top">
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
          </nav>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/admin" exact component={Admin}/>
            <Route path="/admin/perms/notation" exact component={Charte}/>
            <Route path="/admin/charte" exact component={Notation}/>
            //<Route component={error404}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Index
