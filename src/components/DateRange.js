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
import { th } from 'date-fns/esm/locale';

const API_URL = "http://localhost:5000/api/dataset"

export default class DateRange extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
      allx:[],
      ally:[],
      allData:[],
      dataset: undefined,
      strategyOne: undefined,
      strategyTwo: undefined,
    }
  }
  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }
  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);    
  }
  handleResetClick() {
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
    let dateRange = {'start_date': this.state.from, 'end_date':this.state.to}
    fetch (API_URL, {
      headers:{"Content-Type" : "application/json"}, 
      body: JSON.stringify(dateRange),
      mode:"cors",
      method:"post"
    })
  }

componentDidMount() {
  this.postBaseballApi()
}

  notEmpty() {
// to disable button when the user has not selected start and end date
    return this.state.from===undefined && this.state.to===undefined
    }

unixDate(date) {
    // converts date object to unixtime
        date = new Date(date)
        let timestamp = (date.getTime()/1000) - 43200
        return timestamp}

formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

returnDateArray() {
        // creates an array of dates based on the start and end date
        // to be used for y axis data
        // submit button should be disabled when start date and end date are blank
        // otherwise, it throws an error
        // NOTHING TO DEBUG
            let dateArray = []
            let end = this.state.to
            let start = this.state.from
            while (end > start) {
              dateArray.push(new Date(start))
              start.setDate(start.getDate() + 1)
            }
            let unixArray = dateArray.map((element, i) => {
              return this.unixDate(element)})
            return unixArray
          }

          returnSplice(arrayX) {
            // returns section of dataset which includes only the dates from the selected date range
            // by spicing the original dataset 
            // gets the start date, then the length of the array
            // finds the index of the start date in the original dataset
            // then splices the original dataset for that many items, starting at the correct index(start date)
                let start = arrayX[0]
                let games = arrayX.length
                console.log("ALL X", this.state.allx)
                let index = this.state.allx.indexOf(start)
                let section = this.state.dataset.splice(index, games)
                console.log("the section", section)
                this.setState({dataset: section})
                console.log("state", section)}

    strategyOne(){
      this.setState({strategyOne:[{x:1, y:3},{x:2, y:4},{x:3, y:-2},{x:4, y:7},{x:5, y:3},{x:6, y:-3},{x:7, y:3}]})
    }
    strategyTwo(){
      this.setState({strategyTwo:[{x:1, y:4},{x:2, y:6},{x:3, y:-12},{x:4, y:7},{x:5, y:6},{x:6, y:-1},{x:7, y:6}]})
    }

    showAll() {
      if (this.state.dataset===undefined){this.getBaseballApi()}
      if (this.state.dataset!==undefined){this.setState({dataset: undefined})}
    }

    showStrategyOne() {
      if (this.state.strategyOne===undefined){this.strategyOne()}
      if (this.state.strategyOne!==undefined){this.setState({strategyOne: undefined})}
    }

    showStrategyTwo() {
      if (this.state.strategyTwo===undefined){this.strategyTwo()}
      if (this.state.strategyTwo!==undefined){this.setState({strategyTwo: undefined})}
    }
      

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div>
        <button 
        className ='button' 
        onClick={()=>{this.showAll()}}>
        Show All
        </button>
        <button 
        className ='button' 
        onClick={()=>{this.showStrategyOne()}}>
        Show Strategy 1
        </button>
        <button 
        className ='button' 
        onClick={()=>{this.showStrategyTwo()}}>
        Show Strategy 2
        </button>
      <LineChart data = {this.state.dataset} strategyOne = {this.state.strategyOne} strategyTwo = {this.state.strategyTwo}/>
      <div className="RangeExample">
        <p className='input'>
          {!from && !to && 'Select start date'}
          {from && !to && 'Select end date'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from &&
            to && (
              <button className="link" onClick={this.handleResetClick}>
                Reset
              </button>
            )}
        </p>
        
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        <button 
        className='button' 
        type='submit' 
        onClick={()=>{this.returnSplice(this.returnDateArray())}}
        disabled={this.notEmpty()}>
            Render Graph
          </button>
        <Helmet>

        
          <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`}</style>
        </Helmet>
        
      </div>
      </div>
    );
  }
}