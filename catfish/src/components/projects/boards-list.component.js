import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardBody from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck';
import CardColumns from 'react-bootstrap/CardColumns'
import '../../styles/listboards.css'

// construct view board
const Board = props => (
    <CardBody className="cardbody">
        <ul>
        <ul className="card-header" >
        <ul className="card-subtitle">Title:</ul>
            <ul className="card-title">{props.board.board_title}</ul>
        </ul>
        <ul></ul>
        <ul className="card-subtitle" > Description: </ul>
        <ul className="card-title">{props.board.board_description}</ul>
        <ul></ul>
        <ul className="card-subtitle">Responsible:</ul>
        <ul></ul>
        <ul className="card-subtitle-responsible text-muted">{props.board.board_responsible} </ul>
        <ul></ul>
        <ul></ul>
    <Link to={"boards/edit/"+props.board._id} style={{padding: '10px'}}>Edit</Link>
            </ul>
        </CardBody>
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
            <div >
                <h3>Projects List</h3>
                <CardDeck>
                    <div className="row">
                        <div className="col-11">
                    <CardColumns>
                    { this.boardList() }
                    </CardColumns>
                        </div>
                    </div>
                </CardDeck>
                    <Link className={"adduserbutton"} to={"/boards/create/" }>< FontAwesomeIcon className={"adduserbuttonicon"} icon="plus" /></Link>
            </div>

        )
    }
}
