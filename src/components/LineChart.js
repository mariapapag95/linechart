import React from 'react'
import {FlexibleWidthXYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries, LineSeries, XYPlot} from 'react-vis';


function LineChart(props) {
    return(
        
        < FlexibleWidthXYPlot
        xType="ordinal"
        height={500} >
        
        <HorizontalGridLines 
            style ={{stroke : "#f0f0f0"}}/>
        <VerticalGridLines 
            style ={{stroke : "#f0f0f0"}}/>
        <XAxis 
            tickTotal = {10}
            tickSize = {3}
            tickLabelAngle = {-90}
            style ={{text: {fontSize: 5}}}/>
        <YAxis 
            style ={{text: {fontSize: 5}}}/>
        <LineSeries
        // THIS GRAPH RENDERS LINE GRAPH FOR PORTFOLIO VALUE OVER TIME FOR SELECTED RANGE OF DATES
            style = {{stroke : "green", fill : "none", strokeWidth: 3, curve: 'curveBasis'}}
            // markStyle = {{stroke : "green", fill : "none", size: '1'}}
            data= {props.data}/>
        {/* <LineMarkSeries
        // THIS GRAPH RENDERS LINE GRAPH FOR PORTFOLIO VALUE OVER TIME FOR SELECTED RANGE OF DATES
            style = {
                {stroke : "red",
                fill : "none"}
            } 
            data= {props.strategyOne}/>
            <LineMarkSeries
        // THIS GRAPH RENDERS LINE GRAPH FOR PORTFOLIO VALUE OVER TIME FOR SELECTED RANGE OF DATES
            style = {
                {stroke : "blue",
                fill : "none"}
            } 
            data= {props.strategyTwo}/> */}
    </FlexibleWidthXYPlot>
    )
}

export default LineChart;