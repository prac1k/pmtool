import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email:'',
            password:''
        }
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            email: this.state.role,
            phone_number: this.state.phone_number,
        };

        // UPDATE HERE TO AVOID PAGE REFRESH
        axios.post('http://localhost:4000/users/add', obj)
            .then(res => window.location.href="/users");

        this.setState({
            name: '',
            email: '',
            password: ''
        })

    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Add New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Full Name:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className={"adduserbuttonform"}><FontAwesomeIcon className={"adduserbuttonformicon"} icon="plus"/>
                            <Link to={"/"}></Link>
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
