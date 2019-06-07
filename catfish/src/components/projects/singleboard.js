import React, { Component } from 'react';
import axios from 'axios';
import  Card from 'react-bootstrap/Card';



class SingleBord extends Component {

    constructor(props) {
        super(props);

        this.onChangeBoardTitle = this.onChangeBoardTitle.bind(this);
        this.onChangeBoardDescription = this.onChangeBoardDescription.bind(this);
        this.onChangeBoardResponsible = this.onChangeBoardResponsible.bind(this);
        this.onChangeBoardCompleted = this.onChangeBoardCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            board_title: '',
            board_description: '',
            board_responsible: '',
            board_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/boards/board/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    board_title: response.data.board_title,
                    board_description: response.data.board_description,
                    board_responsible: response.data.board_responsible,
                    board_completed: response.data.board_completed
                })
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


    onChangeBoardResponsible(e) {
        this.setState({
            board_responsible: e.target.value
        });
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
            .then(res => console.log(res.data));

        this.props.history.push('/boards');
    }

    render() {
        return (
            <div>

                <Card onSubmit={this.onSubmit}>
                    <h3 align="center">{this.state.board_title}</h3>
                    <cardBody>
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
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.board_responsible}
                            onChange={this.onChangeBoardResponsible}
                        />
                    </div>

                    </cardBody>
                </Card>
            </div>
        )
    }
}
export default SingleBord;
