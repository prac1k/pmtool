import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Create from './components/usermanagement/create.component';
import Edit from './components/usermanagement/edit.component';
import Users from './components/usermanagement/users.component';
import Register from "./components/loginregister/Register";
import Login from "./components/loginregister/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";
import PrivateRouteAdmin from "./components/privateroutecomponents/PrivateRouteAdmin";
import PrivateRoutePM from "./components/privateroutecomponents/PrivateRoutePM";
import PrivateRouteSales from "./components/privateroutecomponents/PrivateRouteSales";
import PrivateRouteManagers from "./components/privateroutecomponents/PrivateRouteManagers";
import PrivateRouteDevelopers from "./components/privateroutecomponents/PrivateRouteDevelopers";
import Createboard from "./components/projects/create-board.component";
import EditBoard from "./components/projects/edit-board.component";
import BoardsList from "./components/projects/boards-list.component";
import SingleBoard from "./components/projects/singleboard";
import Footer from "./components/Footer"


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
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login} />
                    <Route path="/boards/" exact component={BoardsList} />
                    <Route path="/boards/board/:id" component={SingleBoard} />
                    <Route path="/boards/edit/:id" component={EditBoard} />
                    <Route path="/boards/create" component={Createboard} />
                        <PrivateRouteAdmin exact path="/dashboard" component={Dashboard} />
                        <PrivateRouteAdmin path="/addusers" component={Users}/>
                        <PrivateRouteAdmin path='/create' component={ Create }/>
                        <PrivateRouteAdmin path='/edit/:id' component={ Edit }/>
                        <PrivateRoutePM exact path="/dashboard" component={Dashboard} />
                        <PrivateRoutePM path="/addusers" component={Users}/>
                        <PrivateRoutePM path='/create' component={ Create }/>
                        <PrivateRoutePM path='/edit/:id' component={ Edit }/>
                        <PrivateRouteSales exact path="/dashboard" component={Dashboard} />
                        <PrivateRouteSales path="/addusers" component={Users}/>
                        <PrivateRouteSales path='/create' component={ Create }/>
                        <PrivateRouteSales path='/edit/:id' component={ Edit }/>
                        <PrivateRouteManagers exact path="/dashboard" component={Dashboard} />
                        <PrivateRouteManagers path="/addusers" component={Users}/>
                        <PrivateRouteManagers path='/create' component={ Create }/>
                        <PrivateRouteManagers path='/edit/:id' component={ Edit }/>
                        <PrivateRouteDevelopers exact path="/dashboard" component={Dashboard} />
                        <PrivateRouteDevelopers path="/addusers" component={Users}/>
                    </Switch>
                    <Footer></Footer>
                </div>
            </Router>
            </Provider>
        );
    }
}

export default App;
