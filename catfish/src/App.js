import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Create from './components/create.component';
import Edit from './components/edit.component';
import Users from './components/users.component';
import registeruser from "./components/registeruser";
import loginuser from "./components/loginuser";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store";

library.add(faUserPlus, faPlus)
class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <Router>
                <div className="container">
                    <Navbar/>
                    <Home/>
                    <Switch>
                        <Route exact path='/create' component={ Create } />
                        <Route path='/edit/:id' component={ Edit } />
                        <Route path='/users' component={ Users } />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={registeruser} />
                        <Route exact path="/login" component={loginuser} />
                    </Switch>
                </div>
            </Router>
            </Provider>
        );
    }
}

export default App;
