import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:4000/addusers/delete/'+this.props.obj._id)
            .then(window.location.href="/addusers")
            .catch(err => console.log(err))
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.full_name}
                </td>
                <td>
                    {this.props.obj.role}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
                    <button onClick={this.delete} className="btn removebutton">Delete</button>
                </td>
            </tr>
        );
    }
}

export default TableRow;
