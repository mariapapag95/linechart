import React, {Component} from 'react'
import {VictoryScatter, VictoryStack, VictoryChart} from 'victory'
import { Redirect } from 'react-browser-router';

class Scatter extends Component {

    state = {
        color: "red",
        data:[
            { x: 0, y: 0 },
            { x: 1, y: -1 },
            { x: 2, y: 4 },
            { x: 3, y: -6 },
            { x: 4, y: 10 },
            { x: 5, y: 2 },
            { x: 6, y: 6 },
            { x: 7, y: 4 },
            { x: 8, y: 13 },
            { x: 9, y: -2 },
            { x: 10, y: -32 },
            { x: 11, y: 2 },
            { x: 12, y: 12 },
            { x: 13, y: 2 },
            { x: 14, y: -2 },
            { x: 15, y: 22 },
          ]
    }

    render() {
        return (
            <div className="table">
                <VictoryChart
                animate={{ duration:1500 }}
                width={2000}
                >
                <VictoryStack>
              <VictoryScatter
              data={this.state.data}
              style={{ data: { fill: this.state.color},
                        labels: {color: "white"} }}
              interpolation={"natural"}
              labels={this.state.data.y}
              />
        </VictoryStack>
      </VictoryChart>
            </div>
        )
    }
}

export default Scatter