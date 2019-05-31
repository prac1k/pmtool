import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
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
            </div>
        );
    }
}
export default Navbar;
