
import React, {Component, Fragment} from "react";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const months =
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

class Month extends Component {
    state = {
        month: '',
        options: [
            {
              name: 'Select…',
              value: null,
            },
            {
              name: 'A',
              value: 'a',
            },
            {
              name: 'B',
              value: 'b',
            },
            {
              name: 'C',
              value: 'c',
            },
          ],
          value: '?',
    }

    chooseMonth() {
        return "jello wold"
    }

    handleChange () {
        console.log("hello")
      };

    unixDate(date) {
        // converts date object to unixtime
            date = new Date(date)
            let timestamp = date.getTime()/1000
            return timestamp}

    getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(this.unixDate(new Date(date)));
            date.setDate(date.getDate() + 1);
        }
        console.log(days)
        return days;
    }
    render () {
        const { options, value } = this.state;
        return (
            <div>
                <Fragment className= 'input' >
        <select onChange={this.handleChange} value={value}>
          {options.map(item => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        <h1>Favorite letter: {value}</h1>
      </Fragment>
                <Dropdown
                className='input' 
                options={months} 
                onClick ={() => this.handleChange()}
                onChange = {this.handleChange()}
                placeholder="Select an option" >
                 <select onChange={this.handleChange} value={value}></select>
                </Dropdown>
                <button className='button' onClick={() => this.getDaysInMonth(3,2019)}>
                    MONTH
                </button>
            </div>
        )
    }
}

export default Month;
