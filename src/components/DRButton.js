import React from 'react'
import DateRange from './DateRange'


function DRButton() {
    return(
        <div>
            <button className='button'>
            Select Date Range
            </button>
            <DateRange/>
        </div>
    )
}

export default DRButton;