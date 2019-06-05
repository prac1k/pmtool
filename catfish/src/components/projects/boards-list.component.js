import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// construct view board
const Board = props => (
    <tr>
        <td>{props.board.board_title}</td>
        <td>{props.board.board_description}</td>
        <td>{props.board.board_responsible}</td>

        <td>
            <Link to={"boards/edit/"+props.board._id}>Edit</Link>

        </td>
    </tr>
)

export default class BoardsList extends Component {

    //getting list of boards

    constructor(props) {
        super(props);
        this.state = {boards: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/boards/')
            .then(response => {
                this.setState({ boards: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    boardList() {
        return this.state.boards.map(function(currentBoard, i){
            return <Board board={currentBoard} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Projects List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.boardList() }
                    </tbody>
                </table>
                <Link className={"adduserbutton"} to={"/boards/create/" }>< FontAwesomeIcon className={"adduserbuttonicon"} icon="plus" /></Link>
            </div>
        )
    }
}
