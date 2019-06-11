import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserPlus, faPlus, faCog } from '@fortawesome/free-solid-svg-icons';
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
import Createboard from "./components/boards/create-board.component";
import EditBoard from "./components/boards/edit-board.component";
import BoardsList from "./components/boards/boards-list.component";
import Footer from "./components/Footer";
import ProjectBoard from "./components/projects/ProjectBoard";

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

library.add(faUserPlus, faPlus, faCog)
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
                        <Route exact path="/boards/project/:id" component={ProjectBoard} />
                        <Route exact path="/boards/" component={BoardsList} />
                        <Route exact path="/boards/edit/:id" component={EditBoard} />
                        <Route exact path="/boards/create" component={Createboard} />
                        <PrivateRouteAdmin exact path="/dashboard" component={Dashboard} />
                        <PrivateRouteAdmin path="/addusers" component={Users}/>
                        <PrivateRouteAdmin path='/create' component={ Create }/>
                        <PrivateRouteAdmin path='/edit/:id' component={ Edit }/>
                        <PrivateRouteAdmin path="/boards/" exact component={BoardsList} />
                        <PrivateRouteAdmin path="/boards/edit/:id" component={EditBoard} />
                        <PrivateRouteAdmin path="/boards/create" component={Createboard} />
                        <PrivateRoutePM exact path="/dashboard" component={Dashboard} />
                        <PrivateRoutePM path="/addusers" component={Users}/>
                        <PrivateRoutePM path='/create' component={ Create }/>
                        <PrivateRoutePM path='/edit/:id' component={ Edit }/>
                        <PrivateRoutePM path="/boards/" exact component={BoardsList} />
                        <PrivateRoutePM path="/boards/edit/:id" component={EditBoard} />
                        <PrivateRoutePM path="/boards/create" component={Createboard} />
                        <PrivateRouteSales exact path="/dashboard" component={Dashboard} />
                        <PrivateRouteSales path="/addusers" component={Users}/>
                        <PrivateRouteSales path='/create' component={ Create }/>
                        <PrivateRouteSales path='/edit/:id' component={ Edit }/>
                        <PrivateRouteSales path="/boards/" exact component={BoardsList} />
                        <PrivateRouteSales path="/boards/edit/:id" component={EditBoard} />
                        <PrivateRouteSales path="/boards/create" component={Createboard} />
                        <PrivateRouteManagers exact path="/dashboard" component={Dashboard} />
                        <PrivateRouteManagers path="/addusers" component={Users}/>
                        <PrivateRouteManagers path='/create' component={ Create }/>
                        <PrivateRouteManagers path='/edit/:id' component={ Edit }/>
                        <PrivateRouteManagers path="/boards/" exact component={BoardsList} />
                        <PrivateRouteManagers path="/boards/edit/:id" component={EditBoard} />
                        <PrivateRouteManagers path="/boards/create" component={Createboard} />
                        <PrivateRouteDevelopers exact path="/dashboard" component={Dashboard} />
                        <PrivateRouteDevelopers path="/addusers" component={Users}/>
                        <PrivateRouteDevelopers path="/boards/" exact component={BoardsList} />
                    </Switch>
                    <Footer></Footer>
                </div>
            </Router>
            </Provider>
        );
    }
}

export default App;
