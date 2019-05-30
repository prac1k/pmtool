import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons'
import Create from './components/create.component';
import Edit from './components/edit.component';
import Users from './components/users.component';

library.add(faUserPlus, faPlus)
class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to={'/'} className="navbar-brand">Catfish Project</Link>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/users'} className="nav-link">Users</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/boards'} className="nav-link">Boards</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/mytasks'} className="nav-link">My Tasks</Link>
                                </li>
                            </ul>
                        </div>
                    </nav> <br/>
                    <h2>Catfish Project</h2> <br/>
                    <Switch>
                        <Route exact path='/create' component={ Create } />
                        <Route path='/edit/:id' component={ Edit } />
                        <Route path='/users' component={ Users } />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
