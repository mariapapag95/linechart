import React, {Component} from "react";
import NumberFormat from "react-number-format"


const API = 'http://0.0.0.0:5000/api/summary_statistics'
// const numeral = require('numeral');
// numeral.defaultFormat('0,000');

const formatCurrency = 
    new Intl.NumberFormat("en-US",
    {style: "currency",
     currency: "USD",
     currencyDisplay: "symbol",
     useGrouping: true,
     minimumFractionDigits: 0})

const formatNumber = new Intl.NumberFormat(
    {style: "decimal",
     useGrouping: true,
     minimumFractionDigits: 0})
        
const formatPercent = new Intl.NumberFormat("en-US", 
            {style: "percent",
             minimumFractionDigits: 1,
             maximumFractionDigits: 1})

class StatsTable extends Component {

    componentDidUpdate() {
        // const promise = fetch(API)
        // promise.then(blob => blob.json()).then(json => 
        //     this.setState({data: json}))
        }
    
    
        showBetType = input => {
        if (input === 'ml') {return "Money Line"}
        if (input === 'ou') {return "Over / Under"}
        if (input === 'rl') {return "Run Line"}
    }

    renderTableData() {
        return this.props.data.map((element, index) => {
            const { wins, losses, pushes, win_amount_avg, win_amount_std } = element
            const total_games_played = wins + losses + pushes

            return (
                <tbody key={index}>
                    <tr>
                        <th>Bet Type</th>
                        <td colSpan="2">{this.showBetType(this.props.betType)}</td>
                        
                    </tr>
                    <tr>
                        <th>Strategy</th>
                        <td colSpan="2">{this.props.strategy}</td>
                    </tr>
                    <tr>
                        <th>Bet Amount</th>
                        <td colSpan="2">
                        {formatCurrency.format(this.props.betAmount)}</td>
                    </tr>
                    <tr>
                        <th>Season</th>
                        <td colSpan="2">{(`${this.props.season + "-2019"}`)}</td>
                    </tr>
                    <tr>
                        <th>Number of Bets</th>
                        <td colSpan="2">{formatNumber.format(total_games_played)}</td>
                    </tr>
                    <tr>
                        <th>Win Total</th>
                        <td>{formatNumber.format(wins)}</td>
                        <td>{formatPercent.format(wins / total_games_played)}</td>
                    </tr>
                    <tr>
                        <th>Loss Total</th>
                        <td>{formatNumber.format(losses)}</td>
                        <td>{formatPercent.format(`${losses / total_games_played}`)}</td>
                    </tr>
                    <tr>
                        <th>Pushes</th>
                        <td>{formatNumber.format(pushes)}</td>
                        <td>{formatPercent.format(`${pushes / total_games_played}`)}</td>
                    </tr>
                    <tr>
                        <th>Win Amount Average</th>
                        <td colSpan="2">{formatNumber.format(win_amount_avg)}</td>
                    </tr>
                    <tr>
                        <th>Win Amount SD</th>
                        <td colSpan="2">{formatPercent.format(win_amount_std)}</td>
                    </tr>
                </tbody> 
            )
        })
    }

    render () {
            const { betAmount } = this.props;
            // const { data } = this.state;
        return (
                <div>
                {betAmount ? (
                <h3>Betting Strategy Results</h3>) : ""}
                <table className="table">
                    {this.renderTableData()}
                </table>
                </div> 

        )
    }
}

export default StatsTable;