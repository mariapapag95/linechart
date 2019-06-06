import React, {Component} from "react"
import {FlexibleXYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';
import Calendar from './CalendarTest'

const API_URL = "http://localhost:4444"

class DateRange extends Component {

    constructor(props) {
        super(props);
            this.state = {
                dataset : [],
                x : [],
                y : [],
                startdate : '',
                enddate : '',
                dateRange: []
            }}
            
        notEmpty() {
            return this.state.startdate.length > 0 && this.state.enddate.length > 0;
            }

        handleChange = event => {
            this.setState({
                [event.target.id]: event.target.value
                });
            }

        handleSubmit = async event => {
            event.preventDefault();
            }

        setDates = () => {
            fetch (API_URL)
                .then(blob => blob.json()).then(json => {
                let baseball_api = json
    
                let x = ////////////////this.dateRange(this.state.startdate, this.state.enddate)
                    this.setState({x: x})
                    console.log("Date:", x)
            
                let y = this.state.x.map((element, i) => {
                    return baseball_api[x]})
                    this.setState({y: y})
                    console.log("Portfolio Value:", y)

                const dataset = x.map((x, i) => 
                    ({x:x, y: y[i]}));
        
                console.log("this dataset before setState", this.state.dataset)
                this.setState({dataset: dataset})
                console.log("thist is dataset afer setState",this.state.dataset)
            })}


            nothing() {
                console.log("I do nothing")
            }


/////////////////////////////////////////////////////////////////////////////////



            original() {
                fetch(API_URL)
                .then(blob => blob.json()).then(json => {
                let baseball_api = json

                let startdate = Number(document.getElementById(startdate))
                let enddate = Number(document.getElementById(enddate))

                let x = /////////////////////this.dateRange(startdate, enddate)
                    this.setState({x: x})
                console.log("Date:", x)
        
                let y = this.state.x.map((element, i) => {
                    return baseball_api[x]})
                    this.setState({y: y})
                console.log("Portfolio Value:", y)

                const dataset = x.map((x, i) => 
                    ({x:x, y: y[i]}));
        
                console.log("this dataset before setState", this.state.dataset)
                this.setState({dataset: dataset})
                console.log("thist is dataset afer setState",this.state.dataset)
        
                    }
                )
            }

        
            render () {
                return (
                    <div>
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
                            style = {
                                {stroke : "green",
                                fill : "none"}
                            }
                            data={this.state.dataset}/>
                    </FlexibleXYPlot>
                    </div>
                    </div>
                );
            }        
    }
    

export default DateRange