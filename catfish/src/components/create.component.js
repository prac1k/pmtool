import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Select from "react-select";

const userRolesUpdate = [
    { label: "PM", value: 'PM' },
    { label: "Sales", value: 'Sales' },
    { label: "Developers", value: 'Developers' },
    { label: "Managers", value: 'Managers' },
    { label: "Admin", value: 'Admin' },
];

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email:'',
            role: ',',
            password:'',
            password_confirm:''
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
        });
    }
    onChangeRole(optionSelected){
        this.setState({
            role: optionSelected.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangePasswordConfirm(e) {
        this.setState({
            password_confirm: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };

        // UPDATE HERE TO AVOID PAGE REFRESH
        axios.post('http://localhost:4000/addusers/add', obj)
            .then(res => window.location.href="/addusers");

        this.setState({
            name: '',
            email: '',
            role: '',
            password: '',
            password_confirm: ''
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
                        <label>Role: </label>
                        <Select value={this.state.value}
                                options={ userRolesUpdate }
                                onMenuClose={this.state.role}
                                onChange={this.onChangeRole}
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
                        <label>Confirm Password: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.password_confirm}
                               onChange={this.onChangePasswordConfirm}
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
