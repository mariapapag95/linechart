
import React, {Component} from "react";

function unixDate(date) {
    // converts date object to unixtime
        date = new Date(date)
        let timestamp = date.getTime()/1000
        return timestamp}

function returnDateArray (props){
        // creates an array of dates based on the start and end date
        // to be used for y axis data
        // submit button should be disabled when start date and end date are blank
        // otherwise, it throws an error
        // NOTHING TO DEBUG
            let dateArray = []
            let start = props.start
            let end = props.end
            while (start <= end) {
              dateArray.push(new Date(start))
              start.setDate(start.getDate() + 1)
            }
            let unixArray = dateArray.map((element, i) => {
              return unixDate(element)})
            console.log(unixArray)
            return unixArray
          }

export default returnDateArray;