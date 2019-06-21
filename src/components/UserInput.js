import React from 'react';
//import continuousSizeLegend from 'react-vis/dist/legends/continuous-size-legend';
import { withRouter } from 'react-router-dom'
import LineChart from './LineChart';
import DropDownBetType from './DropDownBetType'
import DropDownStrategy from './DropDownStrategy'
import DropDownSeasons from './DropDownSeasons'
import Calendar from './Calendar'
// import { th } from 'date-fns/esm/locale';
import { thisTypeAnnotation } from '@babel/types';
import continuousColorLegend from 'react-vis/dist/legends/continuous-color-legend';
import continuousSizeLegend from 'react-vis/dist/legends/continuous-size-legend';
import CustomDateRange from './CustomDateRange';
import StatsTable from './StatsTable';
import Navbar from './Navbar'
import moment from 'moment';

const API_URL = "http://localhost:5000/api/dataset"
const API = 'http://0.0.0.0:5000/api/summary_statistics'

class UserInput extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };
  constructor(props) {
    super(props);
    // vvvvvvvv these three lines cause error "cannot bind undefined"
    // this.handleDayClick = this.handleDayClick.bind(this);
    // this.handleResetClick = this.handleResetClick.bind(this);
    // this.handleDropDownClick = this.handleDropDownClick.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
      allx:[],
      ally:[],
      allData:[],
      dataset: undefined,
      strategy: undefined,
      betType: undefined,
      betAmount: undefined,
      season: undefined,
      summary: []
      // calendar: false
    }
  }
resetStrategy = () => {
  this.setState({
    strategy: undefined
  })
}

  notEmpty () {
    return this.state.from!==undefined & this.state.to!==undefined
  }

  handleChange = event => {
// used when user inputs bet amount 
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleDropDownClick = (event) => {
    {this.setState({
      [event.target.name]: event.target.id,
    })
    this.season(this.state.season)
    this.setState({betAmount: document.getElementById('betAmount').value})
    console.log("SEASON", this.state.season)}
  }

  reformatData = (data) => {
    const copy = data
      let i = 0
      for (i in copy) {
        copy[i].x = moment.unix(copy[i].x).format("DD-MMM-YYYY")
      }
    return copy
  }

  reset = () => {
    this.setState({
      strategy: undefined,
      betType: undefined,
      betAmount: undefined,
      season: undefined,
    })
  }

  getBaseballApi() {
    // fetches api data and stores in this.state.allData
    // makes default dataset the full dataset 
        fetch (API_URL)
        .then(blob => blob.json()).then(json => {
          let baseballApi = json
          console.log("BASEBALLAPI", baseballApi)
          let x = baseballApi.map((element, i) => {
              return element.date})
          let y = baseballApi.map((element, i) => {
              return element.portfolio_value})
          const dataset = x.map((x, i) => 
                ({x:x, y: y[i]}));
            console.log(x,y)
          this.setState({allx: x, ally: y, allData: baseballApi, dataset: dataset})
      })}

  postBaseballApi() {
    // post request for 
    let post = {
      'start_date': this.state.from, 
      'end_date': this.state.to, 
      'bet_type':this.state.betType, 
      'strategy':this.state.strategy,
      'bet_amount':this.state.betAmount,}
    fetch (API_URL, {
      headers:{"Content-Type" : "application/json"}, 
      body: JSON.stringify(post),
      mode:"cors",
      method:"post"
    })
  }

  unixDate(date) {
// converts date object to unixtime
    date = new Date(date)
    let timestamp = (date.getTime()/1000) - 43200
    return timestamp
  }

  formatDate(date) {
// makes dates formated 
// to be used for graph
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [month, day, year].join('-');
  }

  async returnStrategy () {
// takes in user input for bet type, bet amount, and strategy
// fetches data from api accordingly 
    console.log(this.state.from, this.state.to)
      let post = {'start_date': this.state.from,
                  'end_date': this.state.to,
                  'bet_type': this.state.betType,
                  'strategy': this.state.strategy,
                  'bet_amount': Number(this.state.betAmount)} 
      console.log("did it work", JSON.stringify(post))
      await fetch (API_URL, {
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post),
        mode:"cors",
        method:"POST"
        }).then(blob => blob.json()).then(json => {
          let baseballApi = json
          let x = baseballApi.map((element, i) => {
            return element.date})
          let y = baseballApi.map((element, i) => {
            return element.portfolio_value})
          const dataset = x.map((x, i) => 
            ({x:x, y: y[i]}));
          console.log(this.formatDate(x),y)
          this.setState({dataset: dataset})
          console.log("woohoooooooooo", this.state.dataset)
      })}


  submit() {
    this.returnStrategy()
    let promise = fetch(API)
        promise.then(blob => blob.json()).then(json => 
            this.setState({summary: json}))    
   // this.returnStrategy()
  //   console.log('HAS BEEN SUBMITTED WOOHOO')
  }

  season(year) {
    console.log('season function')
    let start = new Date (year, 2, 15)
    start = this.unixDate(start)
    let end = new Date (2019, 10, 15)
    end = this.unixDate(end)
    this.setState({from : start, to: end})
    console.log("*******THIS.STATE.FROM, THIS.STATE.TO*********",this.state.from, this.state.to)
  }
      

  render() {
    
    const { dataset, summary } = this.state;

    let reData = dataset;
    reData = this.reformatData(dataset)
    console.log(reData)

    return (
      
      
      <div className='newest'>
        {/* <CustomDateRange/> */}
        
        <DropDownSeasons onDropClick={this.handleDropDownClick}/>
        <DropDownBetType reset={this.reset} onDropClick={this.handleDropDownClick}/>
        <DropDownStrategy display={this.state.strategy} betType={this.state.betType} onDropClick={this.handleDropDownClick}/>

        <input 
        className='input'
        id='betAmount'
        placeholder='Enter bet amount'
        onChange={this.handleChange}>
        </input>

        <button 
        className='redbutton' 
        type='submit' 
        onClick={()=>{this.submit()}}>
        Render Graph
        </button>
        <LineChart 
        data = {reData} 
        strategyOne = {this.state.strategyOne} 
        strategyTwo = {this.state.strategyTwo}/>
        <StatsTable
        data={summary}
        betAmount={this.state.betAmount} 
        strategy={this.state.strategy}
        season={this.state.season}
        betType={this.state.betType}
        >
        </StatsTable>
      </div>
    );
  }
}

export default withRouter(UserInput);
