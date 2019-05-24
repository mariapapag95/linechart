import React, {Component} from "react"
import {FlexibleXYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';


const API_URL = "http://localhost:4444";

class Chart extends Component{

    state = {
        dataset : [],
        x : [],
        y : []
    }
    
    componentDidMount() {
        fetch(API_URL)
        // Bringing JSON data into a variable
        .then(blob => blob.json()).then(json => {
            let baseball_api = json
            console.log(baseball_api)
    
        let x = baseball_api.map((element, i) => {
            return Number(element.Date)})
            this.setState({x: x})
        console.log("Date:", x)

        let y = baseball_api.map((element, i) => {
            return element.Portfolio_Value})
            this.setState({y: y})
        console.log("Portfolio Value:", y)

        const dataset = x.map((x, i) => 
            ({x:x, y: y[i]}));

        console.log("this is the new dict", this.state.dataset)
        this.setState({dataset: dataset})
        console.log("LORD HAVE MERCY ON MY SOUL",this.state.dataset)

            }
        )
    }


    render () {
        return (
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
        );
    }
}


export default Chart;

