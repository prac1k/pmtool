import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


export default class CreateColumn extends Component {
    constructor(props) {
        super(props);
        this.onChangeColumn_title = this.onChangeColumn_title.bind(this);
        this.onChangeColumn_board = this.onChangeColumn_board.bind(this);
        this.onChangeColumn_position = this.onChangeColumn_position.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            column_title: '',
            column_board:  '',
            column_position: '',
            errors: {}
        }
    }
    onChangeColumn_title(e) {
        this.setState({
            column_title: e.target.value
        });
    }
    onChangeColumn_board(e) {
        this.setState({
            column_board: e.target.value
        });
    }
    onChangeColumn_position(e) {
        this.setState({
            column_position: e.target.value
         });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`column_title: ${this.state.column_title}`);
        console.log(`column_board: ${this.state.column_board}`);
        console.log(`column_position: ${this.column_position}`);

        const obj = {
            column_title: this.state.column_title,
            column_board: this.state.column_board,
            column_position: this.state.column_position
        };

        axios.post('http://localhost:4000/boards/project/:column_board/column/add', obj)
            .then(res => window.location.href="/")

        this.setState({
            column_title: '',
            column_board: '' ,
            column_position: '' ,
        })
    }


    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>New Column</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.column_title.value}
                            onChange={this.onChangeColumn_title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Board: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.column_board.value}
                               onChange={this.onChangeColumn_board}
                        />

                    </div>
                    <div className="form-group">
                        <label>Position: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.column_position.value}
                               onChange={this.onChangeColumn_position}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className={"adduserbuttonform"}><FontAwesomeIcon className={"adduserbuttonformicon"} icon="plus"/>

                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
