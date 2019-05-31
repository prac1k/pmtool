import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
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
            email: '',
            phone_number:'',
            password:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/users/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    full_name: response.data.full_name,
                    role: response.data.role,
                    email: response.data.email,
                    phone_number: response.data.phone_number,
                    password: response.data.password});
            })
            .catch(function (error) {
                console.log(error);
            })
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
// UPDATE HERE TO AVOID PAGE REFRESH
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            full_name: this.state.full_name,
            role: this.state.role,
            email: this.state.email,
            phone_number: this.state.phone_number,
            password: this.state.password
        };
        axios.post('http://localhost:4000/users/update/'+this.props.match.params.id, obj)
            .then(res => window.location.href="/users");

        this.props.history.push('/users');
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 align="center">Update User</h3>
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
                        <input type="submit"
                               value="Update user"
                               className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
