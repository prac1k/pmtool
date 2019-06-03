import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { Link } from "react-router-dom";
import '../styles/userbuttons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }
    componentDidMount(){
        axios.get('/addusers')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    tabRow(){
        return this.state.users.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">Users List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th colSpan="3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.tabRow() }
                    </tbody>
                </table>
                    <Link className={"adduserbutton"} to={"/create/" }>< FontAwesomeIcon className={"adduserbuttonicon"} icon="user-plus" /></Link>
            </div>
        );
    }
}
