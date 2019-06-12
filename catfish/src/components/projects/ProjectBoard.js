import React, { Component } from 'react';
import { withRouter } from "react-router";
import axios from 'axios';
import '../../styles/listboards.css';
import CreateColumn from "./createcolumn.component";

class ProjectBoard extends Component {

    //getting list of columns

    constructor (props) {
        super(props);
        this.state = {
            column_board: [] ,
            column_title: '' ,
            open: false ,
        }

    }

    getColumns() {
            axios.get('http://localhost:4000/boards/project/'+this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({
                    column_board: response.data.column_board,
                    column_title: response.data.column_title,
                });
                console.log('here');
            })

            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount () {
       this.getColumns()

    }

    onClose = () => {
        this.getColumns()
        this.setState({open: false})}

    //structure and sorting the columns

    render () {
        const {column_board} = this.state;

        return (
            <div className="columnmain">
                <div className="columns">
                    { column_board.sort((a , b) => a.column_position - b.column_position).map((column , idx) => {
                        return (
                            <div className={ `test-${ idx }` } draggable="true"
                                 key={ column._id }>{ column.column_title }</div>
                        )
                    }) }
                </div>
                <button onClick={ () => this.setState({open: true}) } className="btn-primary"> +</button>
                <CreateColumn open={ this.state.open } boardId={this.props.match.params.id} onClose={this.onClose}/>

            </div>
        )
    }
}

export default withRouter(ProjectBoard);
