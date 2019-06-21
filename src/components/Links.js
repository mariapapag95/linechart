import React from 'react'
import {Link, withRouter} from 'react-router-dom';

function Links (props) {
    return (
        <div className="navbar">
            <ul>
                <li><Link to = '/'><strong>Baseball</strong></Link></li>
                <li><Link to = '/results'><strong>Results</strong></Link></li>
            </ul>
        </div>
    )
}

export default withRouter(Links);