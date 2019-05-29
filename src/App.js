import Calendar from './components/Calendar'
import Dates from './components/ChooseDates'
import React from 'react';
import {BrowserRouter} from "react-browser-router";
import StatsTable from './components/StatsTable'
import Navbar from './components/Navbar'
import Month from './components/Month'
import './App.css';



function App() {
  return (
    <BrowserRouter>
    <div className="background">
    <div><Navbar/></div>
    <div className="table"><Dates/></div>
    <div><StatsTable/></div>
 
    </div>
    </BrowserRouter>
  );
}

export default App;
