import React, {Component} from "react";
import Stats from './Stats';

// Data should be coming from an API call
// For this example, we will use the most simple way to access data: an array

const API = 'http://0.0.0.0:5000/api/summary_statistics'


class StatsTable extends Component {
    state = {
        data: []
    }

    componentDidUpdate() {
        const promise = fetch(API)
        promise.then(blob => blob.json()).then(json => 
            this.setState({data: json}))
        }


    render () {
        let wins = this.state.data.map((element, i) => {
            return <Stats stat= {element.wins} key={i} />
        })
        let losses = this.state.data.map((element, i) => {
            return <Stats stat= {element.losses} key={i} />
        })
        let pushes = this.state.data.map((element, i) => {
            return <Stats stat= {element.pushes} key={i} />
        })
        let win_amount_avg = this.state.data.map((element, i) => {
            return <Stats stat= {element.win_amount_avg} key={i} />
        })
        let win_amount_std = this.state.data.map((element, i) => {
            return <Stats stat= {element.win_amount_std} key={i} />
        })

        // the .map(element, i) function iterates through our list of data
        // and returns each item in the list to its own row in the html table below
        // Curly braces inside return() html indicate a variable 
        return (
            <div className='table'>
                <table className="table">
                    <tr>
                        <th></th>
                        <th>Key Stats</th> 
                    </tr>
                    <tr>
                        <td>Wins</td>
                        <td>{wins}</td>
                    </tr>
                    <tr>
                        <td>Losses</td>
                        <td>{losses}</td>
                    </tr>
                    <tr>
                        <td>Pushes</td>
                        <td>{pushes}</td>
                    </tr>
                    <tr>
                        <td>Win Amount Average</td>
                        <td>{win_amount_avg}</td>
                    </tr>
                    <tr>
                        <td>Win Amount SD</td>
                        <td>{win_amount_std}</td>
                    </tr>
                </table>
            </div>

        )
    }
}

export default StatsTable;