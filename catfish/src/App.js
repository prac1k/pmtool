import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Create from './components/create.component';
import Edit from './components/edit.component';
import Users from './components/users.component';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";
import PrivateRoute from "./components/PrivateRoute";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}

library.add(faUserPlus, faPlus)
class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <Router>
                <div className="container">
                    <Navbar/>
                    <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute path="/addusers" component={Users} />
                        <PrivateRoute path='/create' component={ Create } />
                        <PrivateRoute path='/edit/:id' component={ Edit } />
                    </Switch>
                </div>
            </Router>
            </Provider>
        );
    }
}

export default App;
