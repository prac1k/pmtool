import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/listboards.css';


export default class ProjectBoard extends Component {

    //getting list of columns

    constructor(props) {
        super(props);
        this.state = {
            column_board: [],
            column_title: '',


        }

    }

    componentDidMount() {
        axios.get('http://localhost:4000/boards/project/'+this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({
                    column_board: response.data.column_board,
                    column_title: response.data.column_title,
                    });
                console.log(response.data.column_board);
            })

                        .catch(function (error){
                            console.log(error);
            })
        console.log(this.state.column_board);

    }

    //structure and sorting the columns

    render()
    {
       const {column_board} = this.state;

        return (
            <div className="columnmain">
            <div className="columns">
            {column_board.sort((a, b) => a.column_position - b.column_position).map((column, idx) => {
                return (

                    <div className={`test-${idx}`} key={column._id}>{column.column_title}</div>
                )
                })}
            </div>
            </div>
                )

    }
}
