import Chart from './components/Chart'
import React from 'react';
import {BrowserRouter} from "react-browser-router";
import StatsTable from './components/StatsTable'
import Navbar from './components/Navbar'
import DateRange from './components/DateRange'
//import Hover from './components/Hover'
import './App.css';

//    <div className="table"><LineChart/></div>
//     <div className="table"><Chart/></div>
//<div></div>

function App() {
  return (
    <BrowserRouter>
    <div className="background">
    <div><Navbar/></div>
    <div className="table"><DateRange/></div>

    <div><StatsTable/></div>
    </div>
    </BrowserRouter>
  );
}

export default App;
