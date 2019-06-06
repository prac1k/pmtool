import React, { Component } from 'react';
import axios from 'axios';

class DeleteBoardComponent extends Component {

    constructor (props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        axios.get('http://localhost:4000/boards/delete/'+this.props.board._id)
            .then(window.location.href="/boards")
            .catch(err => console.log(err))
    }
    render() {
        return (

                    <button onClick={this.delete} className="btn-removeboard">Delete</button>

        );
    }
}


export default DeleteBoardComponent;
