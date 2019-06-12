import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from 'axios';
import Select from "react-select";

export default class CreateBoard extends Component {

    constructor (props) {
        super(props);

        this.onChangeBoardTitle = this.onChangeBoardTitle.bind(this);
        this.onChangeBoardDescription = this.onChangeBoardDescription.bind(this);
        this.onChangeBoardResponsible = this.onChangeBoardResponsible.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        axios.get('http://localhost:4000/addusers/names')
            .then(res => this.setState({ names: res.data.name }))

        this.state = {
            names: [],
            board_title: '',
            board_description: '' ,
            board_responsible: '' ,
            board_completed: false
        }
    }

    onChangeBoardTitle (e){
        this.setState({
            board_title: e.target.value
            });
    }

    onChangeBoardDescription (e) {
        this.setState({
            board_description: e.target.value
        });
    }

    onChangeBoardResponsible(selectedOptions) {
        console.dir( selectedOptions);
        const assignUb = selectedOptions.map(o => o.value)
        this.setState({
                board_responsible: assignUb
            }
        );
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(`Form submitted:`);
        console.log(`board_title: ${this.state.board_title}`);
        console.log(`Tboard_description: ${this.state.board_description}`);
        console.log(`board_responsible: ${this.board_responsible}`);

        const newBoard = {
            board_title: this.state.board_title,
            board_description: this.state.board_description,
            board_responsible: this.state.board_responsible,
            board_completed: this.state.board_completed
        };

        axios.post('http://localhost:4000/boards/add', newBoard)
            .then(res => window.location.href="/boards")

        this.setState({
            board_title: '',
            board_description: '' ,
            board_responsible: '' ,
            board_completed: false
        })
    }


    render () {
        const listAssignedNames = this.state.names.map(name => {
            return {
                value: name.name,
                label: name.name,
            }
        });


        return (
            <div style={ {marginTop: 10} }>
                <h3>Create New Project</h3>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Project Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={ this.state.board_title }
                            onChange={ this.onChangeBoardTitle }
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               className="form-control"
                               value={ this.state.board_description }
                               onChange={ this.onChangeBoardDescription }
                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <Select value={this.state.value}
                                options={ listAssignedNames }
                                onMenuClose={this.state.board_responsible}
                                onChange={this.onChangeBoardResponsible}
                                isMulti
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className={"adduserbuttonform"}><FontAwesomeIcon className={"adduserbuttonformicon"} icon="plus"/>
                            <Link to={"/boards"}></Link>
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
