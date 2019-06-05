import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';

const userRolesUpdate = [
    { label: "PM", value: 'PM' },
    { label: "Sales", value: 'Sales' },
    { label: "Developers", value: 'Developers' },
    { label: "Managers", value: 'Managers' },
    { label: "Admin", value: 'Admin' },
];

export default class Edit extends Component {
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
            email: '',
            role: '',
            password:'',
            password_confirm:''
        }
    }



    componentDidMount() {
        axios.get('http://localhost:4000/addusers/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    role: response.data.role
                    });
            })
            .catch(function (error) {
                console.log(error);
            })
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
            role:optionSelected.value
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
// UPDATE HERE TO AVOID PAGE REFRESH
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };
        axios.post('http://localhost:4000/addusers/update/'+this.props.match.params.id, obj)
            .then(res => window.location.href="/addusers");

        this.props.history.push('/addusers');
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
                        <input type="submit"
                               value="Update user"
                               className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
