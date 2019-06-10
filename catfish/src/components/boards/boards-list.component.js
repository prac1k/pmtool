import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardBody from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck';
import CardColumns from 'react-bootstrap/CardColumns';
import '../../styles/listboards.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DeleteBoardComponent from './delete-board.component';

// construct view board

const Board = props => (

                   <CardBody className="cardbody">

                                              <Dropdown className="dropdown">
                           < FontAwesomeIcon className={"boardupdediticon"} icon="cog" />
                           <Dropdown.Toggle icon="plus"/>
                           <Dropdown.Menu>
                               <Dropdown.Item href={"boards/edit/"+props.board._id}>Edit</Dropdown.Item>
                               <DeleteBoardComponent {...props}/>
                           </Dropdown.Menu>
                       </Dropdown>
                                   <div  className="flip-card">
            <ul>
            <div className="flip-card-inner">
                <div className="flip-card-front">
        <ul className="card-header" >
            <ul className="card-subtitle">{props.board.board_title}</ul>
        </ul>
         <ul className="card-subtitle-back text-muted">Responsible:</ul>
          <ul></ul>
          <ul className="card-subtitle-responsible">{props.board.board_responsible.join(" ")}</ul>

        <ul></ul>
            </div>
                <div className="flip-card-back">
                    <ul className="card-subtitle-back" > Description: </ul>
        <ul className="card-title-back">{props.board.board_description}</ul>
         </div>
         </div>
         </ul>
         </div>
                       <Link to={"boards/project/"+props.board._id} className="btn btn-light-go">GO!</Link>
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
                        <div className="col-10">
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
