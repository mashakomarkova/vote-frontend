import React, {Component} from "react";
import {Bar} from 'react-chartjs-2';

class ElectionResultsPie extends Component {

    constructor(props) {
        super(props);
        const choiceRate = props.choiceRates;

        const productivity = [];
        const dates = [];
        if (choiceRate != null) {
            productivity.push(choiceRate.userRates)

        }
        this.initialState = {
            labels: dates,
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: productivity
                }
            ]
        };
    }

    componentWillMount() {
        this.setState(this.initialState);
    }

    render() {
        return (
            <div>
            <Bar data={this.state}/>
            </div>
        );
    }
}
export default ElectionResultsPie