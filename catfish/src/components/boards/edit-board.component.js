import React, { Component } from 'react';
import axios from 'axios';
import Select from "react-select";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class EditBoard extends Component {

    constructor(props) {
        super(props);

        this.onChangeBoardTitle = this.onChangeBoardTitle.bind(this);
        this.onChangeBoardDescription = this.onChangeBoardDescription.bind(this);
        this.onChangeBoardResponsible = this.onChangeBoardResponsible.bind(this);
        this.onChangeBoardCompleted = this.onChangeBoardCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            names: [],
            board_title: '',
            board_description: '',
            board_responsible: '',
            board_completed: false
        }
    }


    componentDidMount() {
        axios.get('http://localhost:4000/boards/edit/'+this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({
                    board_title: response.data.board_title,
                    board_description: response.data.board_description,
                    board_responsible: response.data.board_responsible,
                    board_completed: response.data.board_completed
                });
                //second request to axios to get names
                axios.get('http://localhost:4000/addusers/names')
                    .then(res => this.setState({ names: res.data.name }))
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeBoardTitle(e) {
        this.setState({
            board_title: e.target.value
        });
    }

    onChangeBoardDescription(e) {
        this.setState({
            board_description: e.target.value
        });
    }

    //array of chosen items selector


    onChangeBoardResponsible(selectedOptions) {
        const assignUb = selectedOptions.map(o => o.value)
        this.setState({
                board_responsible: assignUb
            }
        );

    }


    onChangeBoardCompleted(e) {
        this.setState({
            board_completed: !this.state.board_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            board_title: this.state.board_title,
            board_description: this.state.board_description,
            board_responsible: this.state.board_responsible,
            board_completed: this.state.board_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/boards/update/'+this.props.match.params.id, obj)
            .then(res => window.location.href="/boards");

        this.props.history.push('/boards');
    };



    render()
    {
    //Render of array to Options

        const listAssignedNames = this.state.names.map(name => {
        return {
            value: name.name,
            label: name.name,
        }
    });
        return (
            <div>
                <h3 align="center">Update Board</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Project Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.board_title}
                                onChange={this.onChangeBoardTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Project Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.board_description}
                                onChange={this.onChangeBoardDescription}
                        />
                    </div>
                    {console.log(this.state.names)}
                    <div className="form-group">
                        <label>Responsible: </label>
                        <Select
                                value={this.state.value}
                                options={ listAssignedNames }
                                onMenuClose={this.state.board_responsible}
                                onChange={this.onChangeBoardResponsible}
                                isMulti
                        />


                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeBoardCompleted}
                                checked={this.state.board_completed}
                                value={this.state.board_completed}
                        />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
