import React, {Component} from "react";
import NumberFormat from "react-number-format"


const API = 'http://0.0.0.0:5000/portfolio'
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

function ResultsTable(props) {
    const { data } = props;
    let copy = data
    copy.sort((a, b) => (a.outcome < b.outcome) ? 1 : -1)

    return(
        <div>
        <table className="table">
        <tbody>
        <tr>
            <th>Strategy</th>
            <th>Average Return (% of Wager)</th>
        </tr>
            {copy.map(element => 
            (
                <tr>
                    <td>{element.strategy}</td>
                    <td>{formatPercent.format(element.outcome / 100)}</td>
                </tr> ))}
            </tbody>
        </table>
        </div>
    )}

export default ResultsTable;