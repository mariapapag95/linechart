import Calendar from './components/drafts/Calendar'
import DRButton from './components/DRButton'
import React from 'react';
import {BrowserRouter} from "react-browser-router";
import StatsTable from './components/StatsTable'
import Navbar from './components/Navbar'
import Month from './components/MonthDropdown'
import './App.css';



function App() {
  return (
    <BrowserRouter>
    <div className="background">
    <div><Navbar/></div>
    <div className="table"><DRButton/></div>
    <div><StatsTable/></div>
    </div>
    </BrowserRouter>
  );
}

export default App;
