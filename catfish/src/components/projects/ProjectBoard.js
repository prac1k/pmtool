import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/listboards.css';



export default class ProjectBoard extends Component {

    //getting list of columns

    constructor(props) {
        super(props);
        this.state = {
            column_title: '',
            column_order: ''

        }

    }

    componentDidMount() {
        axios.get('http://localhost:4000/boards/project/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                        column_title: response.data.column_title
                    });
                            })


                        .catch(function (error){


            })
        console.log(this.props.column_title);
    }


    render()
    {



        return (

            <li></li>

                )
    }
}
