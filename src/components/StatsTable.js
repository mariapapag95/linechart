import React, {Component} from "react";
import Stats from './Stats';

const data = [1,2,3,4,5,6,7];
// Data should be coming from an API call
// For this example, we will use the most simple way to access data: an array


class StatsTable extends Component {
    
    render () {
        let rows = data.map((element, i) => {
            return <Stats some_data={element} key={i} />
            // 
          });
        // the .map(element, i) function iterates through our list of data
        // and returns each item in the list to its own row in the html table below
        // Curly braces inside return() html indicate a variable 
        return (
            <div>
                <table className="table">
                    <tr>
                        <th>column 1</th>
                        <th>column 2</th>
                    </tr>
                    <tr>
                        <td>{rows}</td>
                        <td>{rows}</td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default StatsTable;