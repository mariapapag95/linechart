import React, { Component } from 'react'
import {FlexibleXYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//import isAfter from "date-fns/isAfter"
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import 'bootstrap/dist/css/bootstrap.min.css'


// TO DO: why does start date refresh to one day after the end date
// after hitting render chart button?


const API_URL = "http://localhost:4444"

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
      //dateRange: []
    }
  }

  baseball_api() {
// fetches api data and stores in this.state.allData
// makes default dataset the full dataset 
    fetch (API_URL)
        .then(blob => blob.json()).then(json => {
        let baseball_api = json
        this.setState({allData : baseball_api})
        console.log("THIS IS state.allData=== ", this.state.allData)

      let x = baseball_api.map((element, i) => {
          return Number(element.Date)})
          this.setState({allx: x})
        console.log("All Dates:", this.state.allx)
      let y = baseball_api.map((element, i) => {
          return element.Portfolio_Value})
          this.setState({ally: y})
        console.log("All Portfolio Values:", this.state.ally)
        
      const dataset = x.map((x, i) => 
            ({x:x, y: y[i]}));

        this.setState({dataset: dataset})
        console.log("this is state.completeDataset=====", this.state.dataset)
  })}

  componentDidMount() {return this.baseball_api()}

  notEmpty() {
// to disable button when the user has not selected start and end date
    let dates = [this.state.startDate, this.state.endDate]
    return dates.includes('')
    }

  handleChange = ({ startDate, endDate }) => {
// handles for user error and updates
    startDate = startDate || this.state.startDate
    endDate = endDate || this.state.endDate
    //if (isAfter(startDate, endDate)) {
    //  endDate = startDate
   // }
    this.setState({ startDate, endDate })
  }

  handleChangeStart = startDate => this.handleChange({ startDate })

  handleChangeEnd = endDate => this.handleChange({ endDate })

  unixDate(date) {
// converts date object to unixtime
    date = new Date(date)
    let timestamp = date.getTime()
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
    return unixArray
  }

  returnPortfolio(arrayX) {
// DEBUG: cannot find start date index in this.state.allx even though it should
// it was working as text(array)
// I think because it is now being called inside dateRangeData, directly after
//     x is set to a new state, something is going wrong, even though I have made
//     a new state (allx) to try to avoid this bug
    let start = arrayX[0]
    console.log("the start date, first item in the date range array", start)
    let games = arrayX.length
    console.log("this is the length of the array which has all the dates the user chose", games)
    let index = this.state.allx.indexOf(start)
    console.log("index position in this.state.allx, which is all the x values in the api data", index)
    let section = this.state.dataset.splice(games,index)
    console.log("this is the section of dataset according to the date range selected by the user", section)
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
    let x = this.returnDateArray()

    let y = this.returnPortfolio(x)

    const dataset = x.map((x, i) =>
                  ({x:x, y:y[i]}))
    console.log("this is the section of the dataset according to user chosen date range", dataset)
    this.setState({dataset: dataset})
}


    test(arrayX){
    console.log(arrayX[0])
    let games = arrayX.length
    console.log("this should be 3", games)
    let index = this.state.allx.indexOf(arrayX[0])
    console.log("index position in this.state.allx, which is all the x values in the api data", index)
    let section = this.state.dataset.splice(games,index)
    console.log("this is the section of dataset according to the date range selected by the user", section)
    return section}

  render() {
    return (
      <div>


        <button 
            className="button" 
            type="submit"
            onClick={() => {this.test([1554177600,1554264000,1554350400])}}>
            <strong>test</strong>
        </button>


        <button 
            className="button" 
            type="submit"
            disabled={this.notEmpty()}
            onClick={() => {this.dateRangeData()}}>
            <strong>Render Chart</strong>
        </button>
        <div>
          <DatePicker
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
        <div className="center">
                        <FlexibleXYPlot
                        width={1000}
                        height={300}>
                        <VerticalGridLines 
                            style ={{stroke : "#f0f0f0"}}/>
                        <HorizontalGridLines 
                            style ={{stroke : "#f0f0f0"}}/>
                        <XAxis 
                            tickLabelAngle = {9}
                            style ={{text: {fontSize: 10}}}/>
                        <YAxis 
                            style ={{text: {fontSize: 7}}}/>
                        <LineSeries
                        // THIS GRAPH RENDERS LINE GRAPH FOR PORTFOLIO VALUE OVER TIME FOR SELECTED RANGE OF DATES
                            style = {
                                {stroke : "green",
                                fill : "none"}
                            }
                            data={this.state.dataset}/>
                    </FlexibleXYPlot>
                    </div>
      </div>
    )
  }
}

export default Calendar