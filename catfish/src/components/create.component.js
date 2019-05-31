import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            full_name: '',
            role: '',
            email:'',
            phone_number:'',
            password:''
        }
    }
    onChangeFullName(e) {
        this.setState({
            full_name: e.target.value
        });
    }
    onChangeRole(e) {
        this.setState({
            role: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePhoneNumber(e) {
        this.setState({
            phone_number: e.target.value
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
            full_name: this.state.full_name,
            role: this.state.role,
            email: this.state.role,
            phone_number: this.state.phone_number,
            password: this.state.password
        };

        // UPDATE HERE TO AVOID PAGE REFRESH
        axios.post('http://localhost:4000/users/add', obj)
            .then(res => window.location.href="/users");

        this.setState({
            full_name: '',
            role: '',
            email: '',
            phone_number: '',
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
                            value={this.state.full_name}
                            onChange={this.onChangeFullName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.role}
                               onChange={this.onChangeRole}
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
                        <label>Phone Number: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.phone_number}
                               onChange={this.onChangePhoneNumber}
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
