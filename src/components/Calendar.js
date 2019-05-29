import React, { Component, Redirect } from 'react'
import LineChart from './LineChart'
import Dates from './ChooseDates'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Month from './Month'
import isAfter from "date-fns/isAfter"
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { parse } from '@babel/core';
//import { thisTypeAnnotation } from '@babel/types';
//import continuousSizeLegend from 'react-vis/dist/legends/continuous-size-legend';
//import { thisTypeAnnotation } from '@babel/types';

const API_URL = "http://localhost:5000/api/dataset"

class Calendar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: '',
      endDate: '',
      allData: [],
      allx: [],
      ally: [],
      completeDataset: [], 
      dataset: [],
      x : [],
      y : [],
      redirect : false, 
      //dateRange: []
    }
  }

  getBaseballApi() {
    // fetches api data and stores in this.state.allData
    // makes default dataset the full dataset 
        fetch (API_URL)
        .then(blob => blob.json()).then(json => {
          let baseballApi = json
          console.log("BASEBALLAPI", baseballApi)
          let x = baseballApi.map((element, i) => {
              return Number(element.Date)})
          let y = baseballApi.map((element, i) => {
              return element.Portfolio_Value})
          const dataset = x.map((x, i) => 
                ({x:x, y: y[i]}));

          this.setState({allx: x, ally: y, allData: baseballApi, dataset: dataset})
      })}

  postBaseballApi() {
// fetches api data and stores in this.state.allData
// makes default dataset the full dataset 
    let dateRange = {'start_date': parseFloat(this.state.startDate), 'end_date': parseFloat(this.state.endDate)}
    fetch (API_URL, {
      headers:{"Content-Type" : "application/json"}, 
      body: JSON.stringify(dateRange),
      mode:"cors",
      method:"post"
    })
  }

componentDidMount() {
  this.getBaseballApi()
  this.postBaseballApi()
}

  notEmpty() {
// to disable button when the user has not selected start and end date
    let dates = [this.state.startDate, this.state.endDate]
    return dates.includes('')
    }

  handleChange = ({ startDate, endDate }) => {
// handles for user error and updates
    startDate = startDate || this.state.startDate
    endDate = endDate || this.state.endDate
    if (isAfter(startDate, endDate)) {
      endDate = startDate
    }
    this.setState({ startDate, endDate })
  }

  handleChangeStart = startDate => this.handleChange({ startDate })

  handleChangeEnd = endDate => this.handleChange({ endDate })

  unixDate(date) {
// converts date object to unixtime
    date = new Date(date)
    let timestamp = date.getTime()/1000
    return timestamp}

  returnDateArray() {
// creates an array of dates based on the start and end date
// to be used for y axis data
// submit button should be disabled when start date and end date are blank
// otherwise, it throws an error
// NOTHING TO DEBUG
    let dateArray = []
    let start = this.state.startDate
    let end = this.state.endDate
    while (start <= end) {
      dateArray.push(new Date(start))
      start.setDate(start.getDate() + 1)
    }
    let unixArray = dateArray.map((element, i) => {
      return this.unixDate(element)})
    console.log(unixArray)
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
    let index = this.state.allx.indexOf(start)
    let section = this.state.dataset.splice(games,index)
    console.log("this is the section", section)
    return section}


  dateRangeData = () => {
// setState x and y (arrays) 
// setState dataset to x,y values **VERY IMPORTANT** 
// ^^^react-vis graph uses this.state.dataset to render graph
// returns array of x values and array of y values
// CURRENTLY: x axis hardcoded for dates, will probably stay that way
//            y axis is portfolio value
// TO DO: incorporate stategies via api call 
//        have dropdown menu for options daterange (30 days, year "_", from year1 through year2, etc)
    let dateArray = this.returnDateArray()
    let dataset = this.returnSplice(dateArray)
    this.setState({dataset: dataset})
}


    test(){
    this.postBaseballApi()}


  render() {
    return (
      <div>
        <Month/>
        <button 
            className="button" 
            type="submit"
            onClick={() => {this.test()}}>
            <strong>test</strong>
        </button>

        <button 
            className="button" 
            type="submit"
            onClick={() => <Month/>}>
            <strong>Last 30 Days</strong>
        </button>

        <button 
            className="button" 
            type="submit"
            onClick={() => <Month/>}>
            <strong>Last Year</strong>
        </button>
        <Dates/>
        <div>
          <DatePicker
            className="input"
            placeholderText="Start date"
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            shouldCloseOnSelect={false}
            maxDate={new Date()}
            id = "startdate"
          />
          <DatePicker
            className="input"
            placeholderText="End date"
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            shouldCloseOnSelect={false}
            minDate={this.state.startDate}
            maxDate={new Date()}
            id = "enddate"
          />
        </div>
        
      </div>
    )
  }
}

export default Calendar