import React from 'react';
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//import continuousSizeLegend from 'react-vis/dist/legends/continuous-size-legend';
import LineChart from './LineChart';
import DropDownBetType from './DropDownBetType'
import DropDownStrategy from './DropDownStrategy'
import DropDownSeasons from './DropDownSeasons'
import { th } from 'date-fns/esm/locale';
import { thisTypeAnnotation } from '@babel/types';
import continuousColorLegend from 'react-vis/dist/legends/continuous-color-legend';
import continuousSizeLegend from 'react-vis/dist/legends/continuous-size-legend';

const API_URL = "http://localhost:5000/api/dataset"

export default class DateRange extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleDropDownClick = this.handleDropDownClick.bind(this);
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
    }
  }
resetStrategy = () => {
  this.setState({
    strategy: undefined
  })
}

  handleChange = event => {
// used when user inputs bet amount 
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleDropDownClick = (event) => {
    this.setState({
      [event.target.name]: event.target.id,
    })
    this.season(this.state.season)
    this.setState({betAmount: document.getElementById('betAmount').value})
    console.log("SEASON", this.state.season)
  }

// handleDropDownClick = (event) => {
//   this.setState({
//     [event.target.name]: event.target.id,
//   })
// }

  reset = () => {
    this.setState({
      strategy: undefined,
      betType: undefined,
      betAmount: undefined,
      season: undefined,
    })
  }
  
  getInitialState() {
// used to toggle the graph on/off
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
// used for calendar picker, has become unecesary
// but may be needed if calendar is refactored into UX
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);    
  }

  handleResetClick() {
// used for calendar picker, has become unecesary
// but may be needed if calendar is refactored into UX
    this.setState(this.getInitialState());
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
          console.log(x,y)
          this.setState({dataset: dataset})
          console.log("woohoooooooooo", this.state.dataset)
      })}


  submit() {
    this.returnStrategy()
   // this.returnStrategy()
  //   console.log('HAS BEEN SUBMITTED WOOHOO')
  }

  season(year) {
    console.log('season function')
    let start = new Date (year, 2, 15)
    start = this.unixDate(start)
    console.log("heylloowloewlwoelwoe",start)
    let end = new Date (year, 10, 15)
    end = this.unixDate(end)
    console.log("what type is end?????????", typeof end)
    console.log("fire alarm", end)
    this.setState({from : start, to: end})
    console.log("****************",this.state.from, this.state.to)
  }
      

  render() {
    console.log("RENDER", this.state)
    const { from, to } = this.state;
    //const modifiers = { start: from, end: to }; // used for the calendar date picker, might need later
    return (
      <div>
        <button onClick={()=>{this.season(2010)}}>
          test date
        </button>

        <DropDownSeasons onDropClick={this.handleDropDownClick}/>
        <DropDownBetType reset={this.reset} onDropClick={this.handleDropDownClick}/>
        <DropDownStrategy display={this.state.strategy} betType={this.state.betType} onDropClick={this.handleDropDownClick}></DropDownStrategy>
        {/* <DropDownStrategy onDropClick={this.handleDropDownClick}/> */}

        {/* <button 
        className ='button' 
        onClick={()=>{this.setStartEnd()}}>
        Set start date, end date
        </button> */}
        {/* <DropdownBetType resetStrategy={this.resetStrategy} onDropClick={this.handleDropDownClick}></DropdownBetType> */}
        
      <input 
      className='input'
      id='betAmount'
      placeholder='Enter bet amount'
      onChange={this.handleChange}>
      </input>

      {/* <button 
        className='redbutton' 
        type='submit' 
        onClick={()=>{this.returnStrategy()}}>
            Render Graph
          </button> */}


        <button 
        className='redbutton' 
        type='submit' 
        onClick={()=>{this.submit()}}>
        Render Graph
        </button>

        <LineChart 
        data = {this.state.dataset} 
        strategyOne = {this.state.strategyOne} 
        strategyTwo = {this.state.strategyTwo}/>
      
      </div>
    );
  }
}