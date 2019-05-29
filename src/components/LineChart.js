import React from 'react'
import {FlexibleXYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';


function LineChart(props) {
    return(
        <div className="center">
                        <FlexibleXYPlot
                        margin={{ top: 50, left: 50, right: 50, bottom: 50 }}
                        width={800}
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
                        <LineSeries
                        // THIS GRAPH RENDERS LINE GRAPH FOR PORTFOLIO VALUE OVER TIME FOR SELECTED RANGE OF DATES
                            style = {
                                {stroke : "green",
                                fill : "none"}
                            } 
                            data= {props.data}/>
                    </FlexibleXYPlot>
                    </div>
    )
}

export default LineChart;