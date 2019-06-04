import Calendar from './components/drafts/Calendar'
import DRButton from './components/drafts/DRButton'
import React from 'react';
import {BrowserRouter} from "react-browser-router";
import StatsTable from './components/StatsTable'
import Navbar from './components/Navbar'
import DateRange from './components/DateRange'
import Month from './components/drafts/MonthDropdown'
import './App.css';



function App() {
  return (
    <BrowserRouter>
    <div className="background">
    <div><Navbar/></div>
    <div className="table"><DateRange/></div>
    </div>
    </BrowserRouter>
  );
}

export default App;
