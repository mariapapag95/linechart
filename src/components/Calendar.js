import React, {Component} from "react";
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import 'bootstrap/dist/css/bootstrap.min.css'


class Calendar extends Component {
    static defaultProps = {
        numberOfMonths: 2,
      };
        constructor(props) {
            super(props);
            this.handleDayClick = this.handleDayClick.bind(this);
            this.handleResetClick = this.handleResetClick.bind(this);
            this.state = {
              from: undefined,
              to: undefined}}

    notEmpty () {
        return this.state.from!==undefined & this.state.to!==undefined
      }
    
      handleChange = event => {
    // used when user inputs bet amount 
        this.setState({
          [event.target.id]: event.target.value
        })
      }

      getInitialState() {
        // used to toggle the graph on/off
            return {
              from: undefined,
              to: undefined,
            };
          }

      handleDayClick(day) {
        // used for calendar picker, has become unecesary
        // but may be needed if calendar is refactored into UX
            const range = DateUtils.addDayToRange(day, this.state);
            this.setState(range);    
          }
        
          handleResetClick() {
        // used for calendar picker, has become unecesary
        // but may be needed if calendar is refactored into UX
            this.setState(this.getInitialState());
          }


    render () {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to }; // used for the calendar date picker, might need later
        return (
            <div className='table'>
              <div className="RangeExample">
        <p className='input'>
          {!from && !to && 'Select start date'}
          {from && !to && 'Select end date'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from &&
            to && (
              <button className="link" onClick={this.handleResetClick}>
                Reset
              </button>
            )}
        </p>
        
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        <button 
        className='button' 
        type='submit' 
        onClick={this.handleChange}
        disabled={this.notEmpty()}>
            Submit
          </button>
        <Helmet>

          <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`}</style>
        </Helmet>
        
      </div>
            </div>

        )
    }
}

export default Calendar;