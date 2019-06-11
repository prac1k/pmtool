import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardDeck from 'react-bootstrap/CardDeck';
import '../../styles/listboards.css';



export default class ProjectList extends Component {

    //getting list of columns

    constructor(props) {
        super(props);
        this.state = {columns: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/boards/project/'+this.props.match.params.id)
            .then(response => {
                this.setState({ columns: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    render() {
        return (
            <div >
                <h3>Projects List</h3>
                <CardDeck>
                    <div className="row">
                        <div className="col-10">



                        </div>
                    </div>
                </CardDeck>
                <Link className={"adduserbutton"} to={"/boards/create/" }>< FontAwesomeIcon className={"adduserbuttonicon"} icon="plus" /></Link>
            </div>

        )
    }
}
