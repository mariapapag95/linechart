import React, {Component} from "react";

function UserInput (props) {
        return(
        <div className="center"><h1>Enter team name here</h1>
            <input id="startDate" placeholder="Start Date"/>
            <input id="endDate" placeholder="End Date"/>
            <button className="button" onClick={props.clicked}> <strong>View Data</strong></button>
        </div>
        )
    }

export default UserInput