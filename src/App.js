
import React from 'react';
import {BrowserRouter} from "react-browser-router";
import StatsTable from './components/StatsTable'
import Navbar from './components/Navbar'
import UserInput from './components/UserInput'
import './App.css';



function App() {
  return (
    <BrowserRouter>
    <div className="background">
    <div><Navbar/></div>
    <div className="table"><UserInput/></div>
    <div><StatsTable/></div>
    </div>
    </BrowserRouter>
  );
}

export default App;
