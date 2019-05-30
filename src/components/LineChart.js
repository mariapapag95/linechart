import React from 'react'
import {FlexibleXYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries} from 'react-vis';


function LineChart(props) {
    return(
        <div className="center">
                        <FlexibleXYPlot
                        margin={{ top: 50, left: 50, right: 50, bottom: 50 }}
                        width={700}
                        height={300}>
                        <VerticalGridLines 
                            style ={{stroke : "#f0f0f0"}}/>
                        <HorizontalGridLines 
                            style ={{stroke : "#f0f0f0"}}/>
                        <XAxis 
                            tickLabelAngle = {90}
                            style ={{text: {fontSize: 10}}}/>
                        <YAxis 
                            style ={{text: {fontSize: 7}}}/>
                        <LineMarkSeries
                        // THIS GRAPH RENDERS LINE GRAPH FOR PORTFOLIO VALUE OVER TIME FOR SELECTED RANGE OF DATES
                            style = {
                                {stroke : "green",
                                fill : "none"}
                            } 
                            data= {props.data}/>
                        <LineMarkSeries
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
                            data= {props.strategyTwo}/>
                    </FlexibleXYPlot>
                    </div>
    )
}

export default LineChart;