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
            name: {value: '', isValid: true, errorText: ''},
            email: {value: '', isValid: true, errorText: ''},
            role: '',
            password:{value: '', isValid: true, errorText: ''},
            password_confirm: {value: '', isValid: true, errorText: ''},
            errors: {}
        }
    }
    onChangeName(e) {
        this.setState({
            name: {
                ...this.state.name,
                value: e.target.value
            }
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: {
                ...this.state.email,
                value: e.target.value
            }
            });
    }
    onChangeRole(optionSelected){
        this.setState({
            role: optionSelected.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: {
                ...this.state.password,
                value: e.target.value
            }
        });
    }
    onChangePasswordConfirm(e) {
        this.setState({
            password_confirm: {
                ...this.state.password_confirm,
                value: e.target.value
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const {errors, role, ...fields} = this.state;

        const fieldsKeys = Object.keys(fields);
        fieldsKeys.forEach(field => {
            console.log(field);
            this.setState({
                [field]: {
                    ...this.state[field],
                    isValid: true
                }
            })
        })


        const obj = {
            name: this.state.name.value,
            email: this.state.email.value,
            role: this.state.role,
            password: this.state.password.value,
            password_confirm: this.state.password_confirm.value
        };

        console.log(obj);

        // UPDATE HERE TO AVOID PAGE REFRESH
        axios.post('http://localhost:4000/addusers/add', obj)
            .then(res => window.location.href="/addusers")
            .catch((error) => {
                Object.keys(error.response.data).forEach(field => {
                    console.log(field);
                    this.setState({
                        [field]: {
                            ...this.state[field],
                            errorText: error[field],
                            isValid: false
                        }
                    })
                })



                console.log(this.state);
            });

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
                            value={this.state.name.value}
                            onChange={this.onChangeName}
                        />
                        {this.state.name.isValid?null:<p>Please input your full name</p>}
                    </div>
                    <div className="form-group">
                    <label>Email: </label>
                    <input type="text"
                           className="form-control"
                           value={this.state.email.value}
                           onChange={this.onChangeEmail}
                    />
                        {this.state.email.isValid?null:<p>Please input your email</p>}
                </div>
                    <div className="form-group">
                        <label>Role: </label>
                        <Select value={this.state.role.value}
                                options={ userRolesUpdate }
                                onChange={this.onChangeRole}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.password.value}
                               onChange={this.onChangePassword}
                                                       />
                        {this.state.password.isValid?null:<p>Please input your password</p>}
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.password_confirm.value}
                               onChange={this.onChangePasswordConfirm}
                                                     />
                        {this.state.password_confirm.isValid?null:<p>Please confirm your password</p>}
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
