import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default class CreateTodo extends Component {
    constructor (props) {
        super(props);

        this.onChangeBoardTitle = this.onChangeBoardTitle.bind(this);
        this.onChangeBoardDescription = this.onChangeBoardDescription.bind(this);
        this.onChangeBoardResponsible = this.onChangeBoardResponsible.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
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

    onChangeBoardResponsible (e) {
        this.setState({
            board_responsible: e.target.value
        });
    }

    onSubmit (e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Board Title: ${ this.state.board_title }`);
        console.log(`Board Description: ${ this.state.board_description }`);
        console.log(`Board Responsible: ${ this.state.board_responsible }`);

        this.setState({
            board_title: '',
            board_description: '' ,
            board_responsible: '' ,
            board_completed: false
        })
    }

    render () {
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
                        <input
                            type="text"
                            className="form-control"
                            value={ this.state.board_responsible }
                            onChange={ this.onChangeBoardResponsible }
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className={ "adduserbuttonform" }><FontAwesomeIcon
                            className={ "adduserbuttonformicon" } icon="plus"/>
                            <Link to={ "/boards/" }></Link>
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
